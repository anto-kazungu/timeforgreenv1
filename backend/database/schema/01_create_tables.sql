-- TimeForGreen Database Schema - Member Flow
-- PostgreSQL 14+
-- Created: 2024-12-15

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable timestamp functions
CREATE EXTENSION IF NOT EXISTS "btree_gist";

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    bio TEXT,
    role VARCHAR(20) NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'organizer', 'mentor', 'donor', 'admin')),
    
    -- Gamification fields
    xp INTEGER NOT NULL DEFAULT 0 CHECK (xp >= 0),
    level INTEGER NOT NULL DEFAULT 1 CHECK (level >= 1 AND level <= 10),
    green_points INTEGER NOT NULL DEFAULT 0 CHECK (green_points >= 0),
    total_trees_planted INTEGER NOT NULL DEFAULT 0 CHECK (total_trees_planted >= 0),
    
    -- Status fields
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_verified BOOLEAN NOT NULL DEFAULT false,
    email_verified_at TIMESTAMP,
    last_login_at TIMESTAMP,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

COMMENT ON TABLE users IS 'User accounts and profiles for all roles';
COMMENT ON COLUMN users.xp IS 'Experience points for leveling system';
COMMENT ON COLUMN users.green_points IS 'Points earned from environmental activities';
COMMENT ON COLUMN users.total_trees_planted IS 'Cumulative count of trees planted';

-- ============================================================================
-- COMMUNITIES TABLE
-- ============================================================================
CREATE TABLE communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    category VARCHAR(50) NOT NULL CHECK (category IN ('recycling', 'tree_planting', 'clean_energy', 'water_conservation', 'education', 'other')),
    
    -- Organizer info
    organizer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    -- Stats
    member_count INTEGER NOT NULL DEFAULT 0 CHECK (member_count >= 0),
    total_trees_planted INTEGER NOT NULL DEFAULT 0 CHECK (total_trees_planted >= 0),
    total_events INTEGER NOT NULL DEFAULT 0 CHECK (total_events >= 0),
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

COMMENT ON TABLE communities IS 'Environmental communities organized by users';
COMMENT ON COLUMN communities.is_featured IS 'Whether community appears in featured list';

-- ============================================================================
-- COMMUNITY_MEMBERS TABLE
-- ============================================================================
CREATE TABLE community_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Membership details
    role VARCHAR(20) NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'organizer')),
    joined_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Activity tracking
    trees_planted INTEGER NOT NULL DEFAULT 0 CHECK (trees_planted >= 0),
    events_attended INTEGER NOT NULL DEFAULT 0 CHECK (events_attended >= 0),
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,
    left_at TIMESTAMP,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(community_id, user_id)
);

COMMENT ON TABLE community_members IS 'User membership in communities';

-- ============================================================================
-- TREE_LOGS TABLE
-- ============================================================================
CREATE TABLE tree_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    community_id UUID REFERENCES communities(id) ON DELETE SET NULL,
    
    -- Tree planting details
    tree_code VARCHAR(50) UNIQUE NOT NULL,
    tree_count INTEGER NOT NULL CHECK (tree_count > 0),
    species VARCHAR(100),
    location VARCHAR(255),
    planting_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    -- Verification
    is_verified BOOLEAN NOT NULL DEFAULT false,
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    verification_notes TEXT,
    
    -- Rewards
    xp_awarded INTEGER NOT NULL DEFAULT 0 CHECK (xp_awarded >= 0),
    green_points_awarded INTEGER NOT NULL DEFAULT 0 CHECK (green_points_awarded >= 0),
    
    -- Media
    photo_url VARCHAR(500),
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

COMMENT ON TABLE tree_logs IS 'Records of tree planting activities';
COMMENT ON COLUMN tree_logs.tree_code IS 'Unique code for tracking planted trees';

-- ============================================================================
-- TRAININGS TABLE
-- ============================================================================
CREATE TABLE trainings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('recycling', 'composting', 'water_conservation', 'energy_efficiency', 'sustainable_living', 'other')),
    
    -- Training details
    duration_minutes INTEGER CHECK (duration_minutes > 0),
    difficulty_level VARCHAR(20) CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    
    -- Content
    content_url VARCHAR(500),
    video_url VARCHAR(500),
    materials_url VARCHAR(500),
    
    -- Instructor
    instructor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    instructor_name VARCHAR(200),
    
    -- Rewards
    xp_reward INTEGER NOT NULL DEFAULT 0 CHECK (xp_reward >= 0),
    green_points_reward INTEGER NOT NULL DEFAULT 0 CHECK (green_points_reward >= 0),
    
    -- Stats
    enrollment_count INTEGER NOT NULL DEFAULT 0 CHECK (enrollment_count >= 0),
    completion_count INTEGER NOT NULL DEFAULT 0 CHECK (completion_count >= 0),
    
    -- Status
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP
);

COMMENT ON TABLE trainings IS 'Environmental training programs and courses';

-- ============================================================================
-- USER_TRAININGS TABLE
-- ============================================================================
CREATE TABLE user_trainings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    training_id UUID NOT NULL REFERENCES trainings(id) ON DELETE CASCADE,
    
    -- Progress tracking
    status VARCHAR(20) NOT NULL DEFAULT 'enrolled' CHECK (status IN ('enrolled', 'in_progress', 'completed', 'dropped')),
    progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    
    -- Timestamps
    enrolled_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    completed_at TIMESTAMP,
    
    -- Completion details
    completion_certificate_url VARCHAR(500),
    final_score INTEGER CHECK (final_score >= 0 AND final_score <= 100),
    
    -- Rewards
    xp_earned INTEGER NOT NULL DEFAULT 0 CHECK (xp_earned >= 0),
    green_points_earned INTEGER NOT NULL DEFAULT 0 CHECK (green_points_earned >= 0),
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, training_id)
);

COMMENT ON TABLE user_trainings IS 'User enrollment and progress in training programs';

-- ============================================================================
-- EVENTS TABLE
-- ============================================================================
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id UUID NOT NULL REFERENCES communities(id) ON DELETE CASCADE,
    organizer_id UUID NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
    
    -- Event details
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL CHECK (category IN ('tree_planting', 'cleanup', 'workshop', 'awareness', 'fundraiser', 'other')),
    
    -- Location and time
    location VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    
    -- Capacity
    max_participants INTEGER CHECK (max_participants > 0),
    current_participants INTEGER NOT NULL DEFAULT 0 CHECK (current_participants >= 0),
    
    -- Requirements
    min_age INTEGER CHECK (min_age >= 0),
    requirements TEXT,
    
    -- Rewards
    xp_reward INTEGER NOT NULL DEFAULT 0 CHECK (xp_reward >= 0),
    green_points_reward INTEGER NOT NULL DEFAULT 0 CHECK (green_points_reward >= 0),
    
    -- Status
    status VARCHAR(20) NOT NULL DEFAULT 'upcoming' CHECK (status IN ('draft', 'upcoming', 'ongoing', 'completed', 'cancelled')),
    is_featured BOOLEAN NOT NULL DEFAULT false,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    
    CHECK (end_time > start_time)
);

COMMENT ON TABLE events IS 'Community events and activities';

-- ============================================================================
-- EVENT_PARTICIPANTS TABLE
-- ============================================================================
CREATE TABLE event_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Participation details
    status VARCHAR(20) NOT NULL DEFAULT 'registered' CHECK (status IN ('registered', 'confirmed', 'attended', 'cancelled', 'no_show')),
    registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    attended_at TIMESTAMP,
    
    -- Feedback
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    feedback TEXT,
    
    -- Rewards
    xp_earned INTEGER NOT NULL DEFAULT 0 CHECK (xp_earned >= 0),
    green_points_earned INTEGER NOT NULL DEFAULT 0 CHECK (green_points_earned >= 0),
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(event_id, user_id)
);

COMMENT ON TABLE event_participants IS 'User participation in events';

-- ============================================================================
-- ACHIEVEMENTS TABLE
-- ============================================================================
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('trees', 'events', 'community', 'training', 'points', 'special')),
    
    -- Requirements
    requirement_type VARCHAR(50) NOT NULL CHECK (requirement_type IN ('trees_planted', 'events_attended', 'communities_joined', 'trainings_completed', 'green_points', 'days_active', 'custom')),
    requirement_value INTEGER NOT NULL CHECK (requirement_value > 0),
    
    -- Rewards
    xp_reward INTEGER NOT NULL DEFAULT 0 CHECK (xp_reward >= 0),
    green_points_reward INTEGER NOT NULL DEFAULT 0 CHECK (green_points_reward >= 0),
    
    -- Display
    display_order INTEGER NOT NULL DEFAULT 0,
    is_hidden BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE achievements IS 'Achievement definitions and requirements';

-- ============================================================================
-- USER_ACHIEVEMENTS TABLE
-- ============================================================================
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    
    -- Unlock details
    unlocked_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    progress_value INTEGER NOT NULL DEFAULT 0,
    
    -- Rewards
    xp_earned INTEGER NOT NULL DEFAULT 0 CHECK (xp_earned >= 0),
    green_points_earned INTEGER NOT NULL DEFAULT 0 CHECK (green_points_earned >= 0),
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(user_id, achievement_id)
);

COMMENT ON TABLE user_achievements IS 'User achievement unlocks and progress';

-- ============================================================================
-- USER_STATS TABLE
-- ============================================================================
CREATE TABLE user_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Activity stats
    total_logins INTEGER NOT NULL DEFAULT 0 CHECK (total_logins >= 0),
    days_active INTEGER NOT NULL DEFAULT 0 CHECK (days_active >= 0),
    current_streak INTEGER NOT NULL DEFAULT 0 CHECK (current_streak >= 0),
    longest_streak INTEGER NOT NULL DEFAULT 0 CHECK (longest_streak >= 0),
    last_activity_date DATE,
    
    -- Community stats
    communities_joined INTEGER NOT NULL DEFAULT 0 CHECK (communities_joined >= 0),
    communities_left INTEGER NOT NULL DEFAULT 0 CHECK (communities_left >= 0),
    
    -- Event stats
    events_registered INTEGER NOT NULL DEFAULT 0 CHECK (events_registered >= 0),
    events_attended INTEGER NOT NULL DEFAULT 0 CHECK (events_attended >= 0),
    events_cancelled INTEGER NOT NULL DEFAULT 0 CHECK (events_cancelled >= 0),
    
    -- Training stats
    trainings_enrolled INTEGER NOT NULL DEFAULT 0 CHECK (trainings_enrolled >= 0),
    trainings_completed INTEGER NOT NULL DEFAULT 0 CHECK (trainings_completed >= 0),
    trainings_dropped INTEGER NOT NULL DEFAULT 0 CHECK (trainings_dropped >= 0),
    
    -- Tree planting stats
    trees_planted_total INTEGER NOT NULL DEFAULT 0 CHECK (trees_planted_total >= 0),
    trees_verified INTEGER NOT NULL DEFAULT 0 CHECK (trees_verified >= 0),
    
    -- Achievement stats
    achievements_unlocked INTEGER NOT NULL DEFAULT 0 CHECK (achievements_unlocked >= 0),
    
    -- Audit fields
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE user_stats IS 'Aggregated user statistics for performance';

-- ============================================================================
-- LEVEL_DEFINITIONS TABLE
-- ============================================================================
CREATE TABLE level_definitions (
    level INTEGER PRIMARY KEY CHECK (level >= 1 AND level <= 10),
    name VARCHAR(50) NOT NULL,
    icon VARCHAR(50) NOT NULL,
    color VARCHAR(20) NOT NULL,
    xp_required INTEGER NOT NULL CHECK (xp_required >= 0),
    description TEXT,
    
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE level_definitions IS 'Level system definitions and requirements';

-- Insert level definitions
INSERT INTO level_definitions (level, name, icon, color, xp_required, description) VALUES
(1, 'Rookie', '🌱', '#81C784', 0, 'Just starting your environmental journey'),
(2, 'Sprout', '🌿', '#66BB6A', 100, 'Growing awareness and taking first steps'),
(3, 'Seedling', '🪴', '#4CAF50', 250, 'Developing good environmental habits'),
(4, 'Sapling', '🌳', '#43A047', 500, 'Making consistent positive impact'),
(5, 'Tree', '🌲', '#388E3C', 850, 'Strong environmental advocate'),
(6, 'Grove', '🌴', '#2E7D32', 1300, 'Leading by example in your community'),
(7, 'Forest', '🏞️', '#1B5E20', 1900, 'Inspiring others to take action'),
(8, 'Guardian', '🛡️', '#0D47A1', 2700, 'Protecting and preserving nature'),
(9, 'Champion', '🏆', '#FFD700', 3700, 'Environmental champion and mentor'),
(10, 'Legend', '⭐', '#FF6F00', 5000, 'Legendary environmental leader');

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
DO $$
BEGIN
    RAISE NOTICE 'Database schema created successfully!';
    RAISE NOTICE 'Tables created: 13';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '  1. Run 02_create_indexes.sql for performance optimization';
    RAISE NOTICE '  2. Run 03_create_functions.sql for triggers and procedures';
    RAISE NOTICE '  3. Run seed files to populate sample data';
END $$;
