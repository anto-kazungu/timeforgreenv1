-- TimeForGreen Database Indexes
-- Performance optimization for member flow queries

-- ============================================================================
-- USERS TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_users_email ON users(email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_username ON users(username) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_role ON users(role) WHERE is_active = true;
CREATE INDEX idx_users_level ON users(level);
CREATE INDEX idx_users_xp ON users(xp);
CREATE INDEX idx_users_created_at ON users(created_at);
CREATE INDEX idx_users_last_login ON users(last_login_at);

-- ============================================================================
-- COMMUNITIES TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_communities_organizer ON communities(organizer_id);
CREATE INDEX idx_communities_category ON communities(category) WHERE is_active = true;
CREATE INDEX idx_communities_featured ON communities(is_featured) WHERE is_active = true;
CREATE INDEX idx_communities_created_at ON communities(created_at);
CREATE INDEX idx_communities_member_count ON communities(member_count) WHERE is_active = true;

-- ============================================================================
-- COMMUNITY_MEMBERS TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_community_members_user ON community_members(user_id) WHERE is_active = true;
CREATE INDEX idx_community_members_community ON community_members(community_id) WHERE is_active = true;
CREATE INDEX idx_community_members_joined ON community_members(joined_at);
CREATE INDEX idx_community_members_role ON community_members(role);

-- ============================================================================
-- TREE_LOGS TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_tree_logs_user ON tree_logs(user_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_tree_logs_community ON tree_logs(community_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_tree_logs_code ON tree_logs(tree_code) WHERE deleted_at IS NULL;
CREATE INDEX idx_tree_logs_date ON tree_logs(planting_date);
CREATE INDEX idx_tree_logs_verified ON tree_logs(is_verified) WHERE deleted_at IS NULL;
CREATE INDEX idx_tree_logs_created_at ON tree_logs(created_at);

-- ============================================================================
-- TRAININGS TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_trainings_category ON trainings(category) WHERE is_active = true;
CREATE INDEX idx_trainings_difficulty ON trainings(difficulty_level) WHERE is_active = true;
CREATE INDEX idx_trainings_instructor ON trainings(instructor_id);
CREATE INDEX idx_trainings_featured ON trainings(is_featured) WHERE is_active = true;
CREATE INDEX idx_trainings_enrollment_count ON trainings(enrollment_count) WHERE is_active = true;

-- ============================================================================
-- USER_TRAININGS TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_user_trainings_user ON user_trainings(user_id);
CREATE INDEX idx_user_trainings_training ON user_trainings(training_id);
CREATE INDEX idx_user_trainings_status ON user_trainings(status);
CREATE INDEX idx_user_trainings_completed ON user_trainings(completed_at) WHERE status = 'completed';
CREATE INDEX idx_user_trainings_progress ON user_trainings(progress_percentage);

-- ============================================================================
-- EVENTS TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_events_community ON events(community_id) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_category ON events(category) WHERE status != 'cancelled';
CREATE INDEX idx_events_status ON events(status) WHERE deleted_at IS NULL;
CREATE INDEX idx_events_start_time ON events(start_time) WHERE status IN ('upcoming', 'ongoing');
CREATE INDEX idx_events_featured ON events(is_featured) WHERE status = 'upcoming';
CREATE INDEX idx_events_location ON events(location) WHERE status = 'upcoming';

-- Composite index for event queries
CREATE INDEX idx_events_community_status_time ON events(community_id, status, start_time) WHERE deleted_at IS NULL;

-- ============================================================================
-- EVENT_PARTICIPANTS TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_event_participants_event ON event_participants(event_id);
CREATE INDEX idx_event_participants_user ON event_participants(user_id);
CREATE INDEX idx_event_participants_status ON event_participants(status);
CREATE INDEX idx_event_participants_attended ON event_participants(attended_at) WHERE status = 'attended';
CREATE INDEX idx_event_participants_rating ON event_participants(rating) WHERE rating IS NOT NULL;

-- ============================================================================
-- ACHIEVEMENTS TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_achievements_category ON achievements(category) WHERE is_active = true;
CREATE INDEX idx_achievements_type ON achievements(requirement_type) WHERE is_active = true;
CREATE INDEX idx_achievements_order ON achievements(display_order) WHERE is_active = true AND is_hidden = false;

-- ============================================================================
-- USER_ACHIEVEMENTS TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_user_achievements_user ON user_achievements(user_id);
CREATE INDEX idx_user_achievements_achievement ON user_achievements(achievement_id);
CREATE INDEX idx_user_achievements_unlocked ON user_achievements(unlocked_at);

-- ============================================================================
-- USER_STATS TABLE INDEXES
-- ============================================================================
CREATE INDEX idx_user_stats_user ON user_stats(user_id);
CREATE INDEX idx_user_stats_streak ON user_stats(current_streak);
CREATE INDEX idx_user_stats_trees ON user_stats(trees_planted_total);
CREATE INDEX idx_user_stats_last_activity ON user_stats(last_activity_date);

-- ============================================================================
-- FULL TEXT SEARCH INDEXES
-- ============================================================================
-- Add tsvector columns for full-text search
ALTER TABLE communities ADD COLUMN search_vector tsvector;
ALTER TABLE trainings ADD COLUMN search_vector tsvector;
ALTER TABLE events ADD COLUMN search_vector tsvector;

-- Create GIN indexes for full-text search
CREATE INDEX idx_communities_search ON communities USING GIN(search_vector);
CREATE INDEX idx_trainings_search ON trainings USING GIN(search_vector);
CREATE INDEX idx_events_search ON events USING GIN(search_vector);

-- ============================================================================
-- PARTIAL INDEXES FOR COMMON QUERIES
-- ============================================================================
-- Active users only
CREATE INDEX idx_users_active ON users(id) WHERE is_active = true AND deleted_at IS NULL;

-- Upcoming events
CREATE INDEX idx_events_upcoming ON events(start_time) WHERE status = 'upcoming' AND deleted_at IS NULL;

-- Verified tree logs
CREATE INDEX idx_tree_logs_verified_user ON tree_logs(user_id, tree_count) WHERE is_verified = true AND deleted_at IS NULL;

-- Completed trainings
CREATE INDEX idx_user_trainings_completed_user ON user_trainings(user_id, training_id) WHERE status = 'completed';

-- ============================================================================
-- COMPOSITE INDEXES FOR COMPLEX QUERIES
-- ============================================================================
-- User activity timeline
CREATE INDEX idx_tree_logs_user_date ON tree_logs(user_id, created_at DESC) WHERE deleted_at IS NULL;
CREATE INDEX idx_event_participants_user_date ON event_participants(user_id, created_at DESC);
CREATE INDEX idx_user_trainings_user_date ON user_trainings(user_id, enrolled_at DESC);

-- Community activity
CREATE INDEX idx_community_members_community_joined ON community_members(community_id, joined_at DESC) WHERE is_active = true;

-- Leaderboard queries
CREATE INDEX idx_users_leaderboard_xp ON users(xp DESC, level DESC) WHERE is_active = true AND deleted_at IS NULL;
CREATE INDEX idx_users_leaderboard_trees ON users(total_trees_planted DESC) WHERE is_active = true AND deleted_at IS NULL;
CREATE INDEX idx_users_leaderboard_points ON users(green_points DESC) WHERE is_active = true AND deleted_at IS NULL;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
DO $$
BEGIN
    RAISE NOTICE 'Database indexes created successfully!';
    RAISE NOTICE 'Performance optimization complete';
    RAISE NOTICE 'Indexes created: 50+';
    RAISE NOTICE 'Next step: Run 03_create_functions.sql';
END $$;
