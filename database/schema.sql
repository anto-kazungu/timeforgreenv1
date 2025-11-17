-- Just Go Green Database Schema
-- PostgreSQL Database Setup
-- Version: 1.0.0

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS AND AUTHENTICATION
-- ============================================

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('member', 'donor', 'mentor', 'organizer', 'admin')),
    phone VARCHAR(20),
    location VARCHAR(255),
    bio TEXT,
    avatar_url VARCHAR(500),
    xp INTEGER DEFAULT 0,
    green_points INTEGER DEFAULT 0,
    level INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- User sessions
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token VARCHAR(500) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- COMMUNITIES
-- ============================================

CREATE TABLE communities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    organizer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    location VARCHAR(255),
    category VARCHAR(100),
    member_count INTEGER DEFAULT 0,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Community members
CREATE TABLE community_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(community_id, user_id)
);

-- Community posts
CREATE TABLE community_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    title VARCHAR(255),
    content TEXT NOT NULL,
    image_url VARCHAR(500),
    likes_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Post likes
CREATE TABLE post_likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(post_id, user_id)
);

-- Post comments
CREATE TABLE post_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- EVENTS
-- ============================================

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    organizer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    community_id UUID REFERENCES communities(id) ON DELETE SET NULL,
    location VARCHAR(255),
    event_date TIMESTAMP NOT NULL,
    duration INTEGER, -- in minutes
    max_participants INTEGER,
    current_participants INTEGER DEFAULT 0,
    category VARCHAR(100),
    image_url VARCHAR(500),
    status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    xp_reward INTEGER DEFAULT 0,
    green_points_reward INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Event participants
CREATE TABLE event_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'registered' CHECK (status IN ('registered', 'attended', 'cancelled')),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    attended_at TIMESTAMP,
    UNIQUE(event_id, user_id)
);

-- ============================================
-- TRAINING & MENTORSHIP
-- ============================================

CREATE TABLE training_modules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    mentor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    mentor_name VARCHAR(255),
    expertise_area VARCHAR(100) NOT NULL,
    level VARCHAR(50) CHECK (level IN ('beginner', 'intermediate', 'advanced')),
    duration INTEGER, -- in minutes
    enrolled_count INTEGER DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0,
    status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Training topics
CREATE TABLE training_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES training_modules(id) ON DELETE CASCADE,
    topic VARCHAR(255) NOT NULL
);

-- Training resources
CREATE TABLE training_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES training_modules(id) ON DELETE CASCADE,
    type VARCHAR(50) CHECK (type IN ('video', 'document', 'link', 'quiz')),
    title VARCHAR(255) NOT NULL,
    url VARCHAR(500) NOT NULL,
    description TEXT,
    order_index INTEGER DEFAULT 0
);

-- Module enrollments
CREATE TABLE module_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES training_modules(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    progress INTEGER DEFAULT 0, -- 0-100
    status VARCHAR(50) DEFAULT 'in-progress' CHECK (status IN ('in-progress', 'completed', 'dropped')),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    UNIQUE(module_id, user_id)
);

-- Module ratings
CREATE TABLE module_ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES training_modules(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(module_id, user_id)
);

-- Consultation sessions
CREATE TABLE consultation_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    mentor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    mentor_name VARCHAR(255),
    expertise_area VARCHAR(100),
    session_date TIMESTAMP NOT NULL,
    duration INTEGER, -- in minutes
    max_attendees INTEGER,
    current_attendees INTEGER DEFAULT 0,
    meeting_link VARCHAR(500),
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Session topics
CREATE TABLE session_topics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES consultation_sessions(id) ON DELETE CASCADE,
    topic VARCHAR(255) NOT NULL
);

-- Session attendees
CREATE TABLE session_attendees (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES consultation_sessions(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(session_id, user_id)
);

-- Questions & Answers
CREATE TABLE mentee_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    module_id UUID REFERENCES training_modules(id) ON DELETE CASCADE,
    mentee_id UUID REFERENCES users(id) ON DELETE CASCADE,
    mentee_name VARCHAR(255),
    question TEXT NOT NULL,
    answer TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'answered')),
    asked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    answered_at TIMESTAMP
);

-- ============================================
-- DONATIONS & PROJECTS
-- ============================================

CREATE TABLE donation_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    organizer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    organizer_name VARCHAR(255),
    location VARCHAR(255),
    target_amount DECIMAL(12,2) NOT NULL,
    current_amount DECIMAL(12,2) DEFAULT 0,
    donor_count INTEGER DEFAULT 0,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'cancelled')),
    image_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Donations
CREATE TABLE donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    project_id UUID REFERENCES donation_projects(id) ON DELETE SET NULL,
    donor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    donor_name VARCHAR(255),
    amount DECIMAL(12,2) NOT NULL,
    payment_method VARCHAR(100),
    transaction_id VARCHAR(255),
    message TEXT,
    is_anonymous BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    tax_receipt_id VARCHAR(255),
    donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Community needs
CREATE TABLE community_needs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    community_id UUID REFERENCES communities(id) ON DELETE SET NULL,
    community_name VARCHAR(255),
    urgency VARCHAR(50) CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
    estimated_cost DECIMAL(12,2) NOT NULL,
    funded_amount DECIMAL(12,2) DEFAULT 0,
    backers INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'open' CHECK (status IN ('open', 'funded', 'in-progress', 'completed')),
    requested_by UUID REFERENCES users(id) ON DELETE SET NULL,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- REWARDS & ACHIEVEMENTS
-- ============================================

CREATE TABLE rewards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    green_points_cost INTEGER NOT NULL,
    stock INTEGER,
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reward redemptions
CREATE TABLE reward_redemptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reward_id UUID REFERENCES rewards(id) ON DELETE SET NULL,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    green_points_spent INTEGER NOT NULL,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'delivered', 'cancelled')),
    redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    delivered_at TIMESTAMP
);

-- Achievements/Badges
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    category VARCHAR(100),
    xp_requirement INTEGER,
    criteria JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User achievements
CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES achievements(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

-- ============================================
-- ACTIVITY & TRANSACTIONS
-- ============================================

-- XP transactions
CREATE TABLE xp_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    reason VARCHAR(255),
    reference_type VARCHAR(100), -- 'event', 'training', 'donation', etc.
    reference_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Green Points transactions
CREATE TABLE green_points_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount INTEGER NOT NULL,
    transaction_type VARCHAR(50) CHECK (transaction_type IN ('earned', 'spent', 'refunded')),
    reason VARCHAR(255),
    reference_type VARCHAR(100),
    reference_id UUID,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Activity log
CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(100),
    entity_id UUID,
    details JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- NOTIFICATIONS
-- ============================================

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT,
    type VARCHAR(50),
    reference_type VARCHAR(100),
    reference_id UUID,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_xp ON users(xp);

-- Communities
CREATE INDEX idx_communities_organizer ON communities(organizer_id);
CREATE INDEX idx_community_members_user ON community_members(user_id);
CREATE INDEX idx_community_members_community ON community_members(community_id);

-- Posts
CREATE INDEX idx_posts_community ON community_posts(community_id);
CREATE INDEX idx_posts_author ON community_posts(author_id);
CREATE INDEX idx_posts_created ON community_posts(created_at DESC);

-- Events
CREATE INDEX idx_events_organizer ON events(organizer_id);
CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);

-- Training
CREATE INDEX idx_modules_mentor ON training_modules(mentor_id);
CREATE INDEX idx_modules_status ON training_modules(status);
CREATE INDEX idx_enrollments_user ON module_enrollments(user_id);
CREATE INDEX idx_enrollments_module ON module_enrollments(module_id);

-- Donations
CREATE INDEX idx_donations_project ON donations(project_id);
CREATE INDEX idx_donations_donor ON donations(donor_id);
CREATE INDEX idx_donations_date ON donations(donated_at DESC);

-- Transactions
CREATE INDEX idx_xp_transactions_user ON xp_transactions(user_id);
CREATE INDEX idx_points_transactions_user ON green_points_transactions(user_id);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- ============================================
-- TRIGGERS FOR AUTO-UPDATE
-- ============================================

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communities_updated_at BEFORE UPDATE ON communities
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON community_posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_modules_updated_at BEFORE UPDATE ON training_modules
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON donation_projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- VIEWS FOR COMMON QUERIES
-- ============================================

-- User stats view
CREATE VIEW user_stats AS
SELECT 
    u.id,
    u.email,
    u.first_name,
    u.last_name,
    u.role,
    u.xp,
    u.green_points,
    u.level,
    COUNT(DISTINCT cm.community_id) as communities_joined,
    COUNT(DISTINCT ep.event_id) as events_attended,
    COUNT(DISTINCT me.module_id) as modules_enrolled,
    COUNT(DISTINCT d.id) as donations_made,
    COALESCE(SUM(d.amount), 0) as total_donated
FROM users u
LEFT JOIN community_members cm ON u.id = cm.user_id
LEFT JOIN event_participants ep ON u.id = ep.user_id AND ep.status = 'attended'
LEFT JOIN module_enrollments me ON u.id = me.user_id
LEFT JOIN donations d ON u.id = d.donor_id AND d.status = 'completed'
GROUP BY u.id;

-- Community stats view
CREATE VIEW community_stats AS
SELECT 
    c.id,
    c.name,
    c.organizer_id,
    COUNT(DISTINCT cm.user_id) as member_count,
    COUNT(DISTINCT cp.id) as post_count,
    COUNT(DISTINCT e.id) as event_count
FROM communities c
LEFT JOIN community_members cm ON c.id = cm.community_id
LEFT JOIN community_posts cp ON c.id = cp.community_id
LEFT JOIN events e ON c.id = e.community_id
GROUP BY c.id;

-- Project funding view
CREATE VIEW project_funding_stats AS
SELECT 
    dp.id,
    dp.title,
    dp.target_amount,
    COALESCE(SUM(d.amount), 0) as current_amount,
    COUNT(DISTINCT d.donor_id) as donor_count,
    ROUND((COALESCE(SUM(d.amount), 0) / dp.target_amount * 100), 2) as funding_percentage
FROM donation_projects dp
LEFT JOIN donations d ON dp.id = d.project_id AND d.status = 'completed'
GROUP BY dp.id;
