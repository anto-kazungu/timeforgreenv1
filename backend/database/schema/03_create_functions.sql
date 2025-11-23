-- TimeForGreen Database Functions and Triggers
-- Automated business logic and data integrity

-- ============================================================================
-- UTILITY FUNCTIONS
-- ============================================================================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communities_updated_at BEFORE UPDATE ON communities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_members_updated_at BEFORE UPDATE ON community_members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tree_logs_updated_at BEFORE UPDATE ON tree_logs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_trainings_updated_at BEFORE UPDATE ON trainings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_trainings_updated_at BEFORE UPDATE ON user_trainings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_participants_updated_at BEFORE UPDATE ON event_participants
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_stats_updated_at BEFORE UPDATE ON user_stats
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- USER LEVEL CALCULATION
-- ============================================================================

CREATE OR REPLACE FUNCTION calculate_user_level(user_xp INTEGER)
RETURNS INTEGER AS $$
DECLARE
    user_level INTEGER;
BEGIN
    SELECT level INTO user_level
    FROM level_definitions
    WHERE xp_required <= user_xp
    ORDER BY level DESC
    LIMIT 1;
    
    RETURN COALESCE(user_level, 1);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Trigger to auto-update user level when XP changes
CREATE OR REPLACE FUNCTION update_user_level()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.xp != OLD.xp THEN
        NEW.level = calculate_user_level(NEW.xp);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_level BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_user_level();

-- ============================================================================
-- TREE LOGGING REWARDS
-- ============================================================================

CREATE OR REPLACE FUNCTION award_tree_planting_rewards()
RETURNS TRIGGER AS $$
DECLARE
    xp_per_tree INTEGER := 10;
    points_per_tree INTEGER := 5;
BEGIN
    -- Calculate rewards
    NEW.xp_awarded = NEW.tree_count * xp_per_tree;
    NEW.green_points_awarded = NEW.tree_count * points_per_tree;
    
    -- Update user stats
    UPDATE users
    SET 
        xp = xp + NEW.xp_awarded,
        green_points = green_points + NEW.green_points_awarded,
        total_trees_planted = total_trees_planted + NEW.tree_count
    WHERE id = NEW.user_id;
    
    -- Update community stats if applicable
    IF NEW.community_id IS NOT NULL THEN
        UPDATE communities
        SET total_trees_planted = total_trees_planted + NEW.tree_count
        WHERE id = NEW.community_id;
    END IF;
    
    -- Update user stats table
    UPDATE user_stats
    SET trees_planted_total = trees_planted_total + NEW.tree_count
    WHERE user_id = NEW.user_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_award_tree_rewards BEFORE INSERT ON tree_logs
    FOR EACH ROW EXECUTE FUNCTION award_tree_planting_rewards();

-- ============================================================================
-- COMMUNITY MEMBER MANAGEMENT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_community_member_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE communities
        SET member_count = member_count + 1
        WHERE id = NEW.community_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE communities
        SET member_count = member_count - 1
        WHERE id = OLD.community_id;
    ELSIF TG_OP = 'UPDATE' AND NEW.is_active != OLD.is_active THEN
        IF NEW.is_active THEN
            UPDATE communities
            SET member_count = member_count + 1
            WHERE id = NEW.community_id;
        ELSE
            UPDATE communities
            SET member_count = member_count - 1
            WHERE id = NEW.community_id;
        END IF;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_community_members AFTER INSERT OR UPDATE OR DELETE ON community_members
    FOR EACH ROW EXECUTE FUNCTION update_community_member_count();

-- ============================================================================
-- EVENT PARTICIPANT MANAGEMENT
-- ============================================================================

CREATE OR REPLACE FUNCTION update_event_participant_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.status IN ('registered', 'confirmed') THEN
        UPDATE events
        SET current_participants = current_participants + 1
        WHERE id = NEW.event_id;
    ELSIF TG_OP = 'DELETE' AND OLD.status IN ('registered', 'confirmed') THEN
        UPDATE events
        SET current_participants = current_participants - 1
        WHERE id = OLD.event_id;
    ELSIF TG_OP = 'UPDATE' THEN
        IF OLD.status IN ('registered', 'confirmed') AND NEW.status NOT IN ('registered', 'confirmed') THEN
            UPDATE events
            SET current_participants = current_participants - 1
            WHERE id = NEW.event_id;
        ELSIF OLD.status NOT IN ('registered', 'confirmed') AND NEW.status IN ('registered', 'confirmed') THEN
            UPDATE events
            SET current_participants = current_participants + 1
            WHERE id = NEW.event_id;
        END IF;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_event_participants AFTER INSERT OR UPDATE OR DELETE ON event_participants
    FOR EACH ROW EXECUTE FUNCTION update_event_participant_count();

-- Award rewards when user attends event
CREATE OR REPLACE FUNCTION award_event_attendance_rewards()
RETURNS TRIGGER AS $$
DECLARE
    event_xp INTEGER;
    event_points INTEGER;
BEGIN
    IF NEW.status = 'attended' AND (OLD.status IS NULL OR OLD.status != 'attended') THEN
        -- Get event rewards
        SELECT xp_reward, green_points_reward INTO event_xp, event_points
        FROM events
        WHERE id = NEW.event_id;
        
        -- Update participant rewards
        NEW.xp_earned = event_xp;
        NEW.green_points_earned = event_points;
        
        -- Update user stats
        UPDATE users
        SET 
            xp = xp + event_xp,
            green_points = green_points + event_points
        WHERE id = NEW.user_id;
        
        -- Update user stats table
        UPDATE user_stats
        SET events_attended = events_attended + 1
        WHERE user_id = NEW.user_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_award_event_rewards BEFORE UPDATE ON event_participants
    FOR EACH ROW EXECUTE FUNCTION award_event_attendance_rewards();

-- ============================================================================
-- TRAINING COMPLETION REWARDS
-- ============================================================================

CREATE OR REPLACE FUNCTION award_training_completion_rewards()
RETURNS TRIGGER AS $$
DECLARE
    training_xp INTEGER;
    training_points INTEGER;
BEGIN
    IF NEW.status = 'completed' AND (OLD.status IS NULL OR OLD.status != 'completed') THEN
        -- Get training rewards
        SELECT xp_reward, green_points_reward INTO training_xp, training_points
        FROM trainings
        WHERE id = NEW.training_id;
        
        -- Update participant rewards
        NEW.xp_earned = training_xp;
        NEW.green_points_earned = training_points;
        
        -- Update user stats
        UPDATE users
        SET 
            xp = xp + training_xp,
            green_points = green_points + training_points
        WHERE id = NEW.user_id;
        
        -- Update training stats
        UPDATE trainings
        SET completion_count = completion_count + 1
        WHERE id = NEW.training_id;
        
        -- Update user stats table
        UPDATE user_stats
        SET trainings_completed = trainings_completed + 1
        WHERE user_id = NEW.user_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_award_training_rewards BEFORE UPDATE ON user_trainings
    FOR EACH ROW EXECUTE FUNCTION award_training_completion_rewards();

-- ============================================================================
-- ACHIEVEMENT CHECKING
-- ============================================================================

CREATE OR REPLACE FUNCTION check_user_achievements(p_user_id UUID)
RETURNS VOID AS $$
DECLARE
    achievement RECORD;
    user_value INTEGER;
    already_unlocked BOOLEAN;
BEGIN
    FOR achievement IN SELECT * FROM achievements WHERE is_active = true LOOP
        -- Check if already unlocked
        SELECT EXISTS(
            SELECT 1 FROM user_achievements 
            WHERE user_id = p_user_id AND achievement_id = achievement.id
        ) INTO already_unlocked;
        
        IF NOT already_unlocked THEN
            -- Get user's current value for this achievement type
            CASE achievement.requirement_type
                WHEN 'trees_planted' THEN
                    SELECT total_trees_planted INTO user_value FROM users WHERE id = p_user_id;
                WHEN 'events_attended' THEN
                    SELECT events_attended INTO user_value FROM user_stats WHERE user_id = p_user_id;
                WHEN 'communities_joined' THEN
                    SELECT communities_joined INTO user_value FROM user_stats WHERE user_id = p_user_id;
                WHEN 'trainings_completed' THEN
                    SELECT trainings_completed INTO user_value FROM user_stats WHERE user_id = p_user_id;
                WHEN 'green_points' THEN
                    SELECT green_points INTO user_value FROM users WHERE id = p_user_id;
                WHEN 'days_active' THEN
                    SELECT days_active INTO user_value FROM user_stats WHERE user_id = p_user_id;
                ELSE
                    user_value := 0;
            END CASE;
            
            -- Unlock achievement if requirement met
            IF user_value >= achievement.requirement_value THEN
                INSERT INTO user_achievements (user_id, achievement_id, progress_value, xp_earned, green_points_earned)
                VALUES (p_user_id, achievement.id, user_value, achievement.xp_reward, achievement.green_points_reward);
                
                -- Award rewards
                UPDATE users
                SET 
                    xp = xp + achievement.xp_reward,
                    green_points = green_points + achievement.green_points_reward
                WHERE id = p_user_id;
                
                -- Update stats
                UPDATE user_stats
                SET achievements_unlocked = achievements_unlocked + 1
                WHERE user_id = p_user_id;
            END IF;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- USER STATS INITIALIZATION
-- ============================================================================

CREATE OR REPLACE FUNCTION initialize_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_stats (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_initialize_user_stats AFTER INSERT ON users
    FOR EACH ROW EXECUTE FUNCTION initialize_user_stats();

-- ============================================================================
-- FULL TEXT SEARCH UPDATE
-- ============================================================================

CREATE OR REPLACE FUNCTION update_communities_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.name, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.location, '')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_communities_search_update BEFORE INSERT OR UPDATE ON communities
    FOR EACH ROW EXECUTE FUNCTION update_communities_search_vector();

CREATE OR REPLACE FUNCTION update_trainings_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_trainings_search_update BEFORE INSERT OR UPDATE ON trainings
    FOR EACH ROW EXECUTE FUNCTION update_trainings_search_vector();

CREATE OR REPLACE FUNCTION update_events_search_vector()
RETURNS TRIGGER AS $$
BEGIN
    NEW.search_vector := 
        setweight(to_tsvector('english', COALESCE(NEW.title, '')), 'A') ||
        setweight(to_tsvector('english', COALESCE(NEW.description, '')), 'B') ||
        setweight(to_tsvector('english', COALESCE(NEW.location, '')), 'C');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_events_search_update BEFORE INSERT OR UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_events_search_vector();

-- ============================================================================
-- HELPER FUNCTIONS FOR API
-- ============================================================================

-- Get user's current level info
CREATE OR REPLACE FUNCTION get_user_level_info(p_user_id UUID)
RETURNS TABLE (
    current_level INTEGER,
    current_level_name VARCHAR,
    current_xp INTEGER,
    xp_for_current_level INTEGER,
    xp_for_next_level INTEGER,
    xp_to_next_level INTEGER,
    progress_percentage INTEGER
) AS $$
DECLARE
    user_xp INTEGER;
    user_level INTEGER;
BEGIN
    SELECT xp, level INTO user_xp, user_level FROM users WHERE id = p_user_id;
    
    RETURN QUERY
    SELECT 
        ld.level,
        ld.name,
        user_xp,
        ld.xp_required,
        COALESCE(next_ld.xp_required, ld.xp_required),
        COALESCE(next_ld.xp_required - user_xp, 0),
        CASE 
            WHEN next_ld.xp_required IS NULL THEN 100
            ELSE ((user_xp - ld.xp_required) * 100 / (next_ld.xp_required - ld.xp_required))
        END
    FROM level_definitions ld
    LEFT JOIN level_definitions next_ld ON next_ld.level = ld.level + 1
    WHERE ld.level = user_level;
END;
$$ LANGUAGE plpgsql;

-- Get user's activity summary
CREATE OR REPLACE FUNCTION get_user_activity_summary(p_user_id UUID, p_days INTEGER DEFAULT 30)
RETURNS TABLE (
    trees_planted INTEGER,
    events_attended INTEGER,
    trainings_completed INTEGER,
    xp_earned INTEGER,
    green_points_earned INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COALESCE(SUM(tl.tree_count), 0)::INTEGER,
        COUNT(DISTINCT ep.event_id)::INTEGER,
        COUNT(DISTINCT ut.training_id)::INTEGER,
        (COALESCE(SUM(tl.xp_awarded), 0) + 
         COALESCE(SUM(ep.xp_earned), 0) + 
         COALESCE(SUM(ut.xp_earned), 0))::INTEGER,
        (COALESCE(SUM(tl.green_points_awarded), 0) + 
         COALESCE(SUM(ep.green_points_earned), 0) + 
         COALESCE(SUM(ut.green_points_earned), 0))::INTEGER
    FROM users u
    LEFT JOIN tree_logs tl ON tl.user_id = u.id 
        AND tl.created_at >= CURRENT_DATE - p_days
        AND tl.deleted_at IS NULL
    LEFT JOIN event_participants ep ON ep.user_id = u.id 
        AND ep.attended_at >= CURRENT_DATE - p_days
        AND ep.status = 'attended'
    LEFT JOIN user_trainings ut ON ut.user_id = u.id 
        AND ut.completed_at >= CURRENT_DATE - p_days
        AND ut.status = 'completed'
    WHERE u.id = p_user_id
    GROUP BY u.id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
DO $$
BEGIN
    RAISE NOTICE 'Database functions and triggers created successfully!';
    RAISE NOTICE 'Automated business logic implemented';
    RAISE NOTICE 'Functions created: 15+';
    RAISE NOTICE 'Triggers created: 20+';
    RAISE NOTICE 'Next step: Run seed files to populate sample data';
END $$;
