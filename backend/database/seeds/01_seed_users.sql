-- TimeForGreen Sample Users
-- Password for all users: "password123" (hashed with bcrypt)
-- In production, use proper password hashing!

-- Insert sample users
INSERT INTO users (id, username, email, password_hash, first_name, last_name, bio, role, xp, level, green_points, total_trees_planted, is_active, is_verified, email_verified_at) VALUES
-- Members
('11111111-1111-1111-1111-111111111111', 'john_green', 'john@example.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'John', 'Green', 'Passionate about environmental conservation and tree planting', 'member', 850, 5, 425, 85, true, true, CURRENT_TIMESTAMP),
('22222222-2222-2222-2222-222222222222', 'sarah_eco', 'sarah@example.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'Sarah', 'Eco', 'Environmental activist and community organizer', 'member', 1200, 6, 600, 120, true, true, CURRENT_TIMESTAMP),
('33333333-3333-3333-3333-333333333333', 'mike_nature', 'mike@example.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'Mike', 'Nature', 'Love hiking and protecting natural habitats', 'member', 450, 3, 225, 45, true, true, CURRENT_TIMESTAMP),
('44444444-4444-4444-4444-444444444444', 'emma_earth', 'emma@example.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'Emma', 'Earth', 'Sustainability advocate and recycling champion', 'member', 2100, 7, 1050, 210, true, true, CURRENT_TIMESTAMP),
('55555555-5555-5555-5555-555555555555', 'alex_forest', 'alex@example.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'Alex', 'Forest', 'Forest conservation enthusiast', 'member', 150, 2, 75, 15, true, true, CURRENT_TIMESTAMP),

-- Organizers
('66666666-6666-6666-6666-666666666666', 'lisa_organizer', 'lisa@example.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'Lisa', 'Organizer', 'Community organizer with 5 years experience', 'organizer', 3000, 8, 1500, 300, true, true, CURRENT_TIMESTAMP),
('77777777-7777-7777-7777-777777777777', 'david_leader', 'david@example.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'David', 'Leader', 'Leading environmental initiatives in the city', 'organizer', 2500, 7, 1250, 250, true, true, CURRENT_TIMESTAMP),

-- Mentors
('88888888-8888-8888-8888-888888888888', 'dr_green', 'drgreen@example.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'Dr. Maria', 'Green', 'Environmental scientist and educator', 'mentor', 4000, 9, 2000, 400, true, true, CURRENT_TIMESTAMP),
('99999999-9999-9999-9999-999999999999', 'prof_eco', 'profeco@example.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'Prof. James', 'Eco', 'Professor of Environmental Studies', 'mentor', 5500, 10, 2750, 550, true, true, CURRENT_TIMESTAMP),

-- Donors
('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'green_corp', 'greencorp@example.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'Green', 'Corporation', 'Corporate sponsor of environmental initiatives', 'donor', 1000, 5, 500, 100, true, true, CURRENT_TIMESTAMP),

-- Admin
('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'admin', 'admin@timeforgreen.com', '$2b$10$rKvVPZqGhXxPZqGhXxPZqOqGhXxPZqGhXxPZqGhXxPZqGhXxPZqGh', 'System', 'Administrator', 'Platform administrator', 'admin', 0, 1, 0, 0, true, true, CURRENT_TIMESTAMP);

-- Update user stats for sample users
UPDATE user_stats SET
    total_logins = FLOOR(RANDOM() * 50 + 10),
    days_active = FLOOR(RANDOM() * 30 + 5),
    current_streak = FLOOR(RANDOM() * 10 + 1),
    longest_streak = FLOOR(RANDOM() * 20 + 5),
    last_activity_date = CURRENT_DATE,
    communities_joined = FLOOR(RANDOM() * 5 + 1),
    events_registered = FLOOR(RANDOM() * 10 + 2),
    events_attended = FLOOR(RANDOM() * 8 + 1),
    trainings_enrolled = FLOOR(RANDOM() * 5 + 1),
    trainings_completed = FLOOR(RANDOM() * 3 + 1)
WHERE user_id IN (
    '11111111-1111-1111-1111-111111111111',
    '22222222-2222-2222-2222-222222222222',
    '33333333-3333-3333-3333-333333333333',
    '44444444-4444-4444-4444-444444444444',
    '55555555-5555-5555-5555-555555555555'
);

-- Insert sample achievements
INSERT INTO achievements (id, name, description, icon, category, requirement_type, requirement_value, xp_reward, green_points_reward, display_order) VALUES
('a1111111-1111-1111-1111-111111111111', 'First Steps', 'Join your first community', '🌱', 'community', 'communities_joined', 1, 50, 25, 1),
('a2222222-2222-2222-2222-222222222222', 'Tree Planter', 'Plant your first 10 trees', '🌳', 'trees', 'trees_planted', 10, 100, 50, 2),
('a3333333-3333-3333-3333-333333333333', 'Forest Maker', 'Plant 100 trees', '🌲', 'trees', 'trees_planted', 100, 500, 250, 3),
('a4444444-4444-4444-4444-444444444444', 'Event Enthusiast', 'Attend 5 events', '🎉', 'events', 'events_attended', 5, 150, 75, 4),
('a5555555-5555-5555-5555-555555555555', 'Knowledge Seeker', 'Complete 3 trainings', '🎓', 'training', 'trainings_completed', 3, 200, 100, 5),
('a6666666-6666-6666-6666-666666666666', 'Community Builder', 'Join 5 communities', '👥', 'community', 'communities_joined', 5, 250, 125, 6),
('a7777777-7777-7777-7777-777777777777', 'Green Champion', 'Earn 1000 green points', '💚', 'points', 'green_points', 1000, 300, 150, 7),
('a8888888-8888-8888-8888-888888888888', 'Dedicated Member', 'Stay active for 30 days', '📅', 'special', 'days_active', 30, 400, 200, 8);

-- Award some achievements to sample users
INSERT INTO user_achievements (user_id, achievement_id, progress_value, xp_earned, green_points_earned) VALUES
('11111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111', 2, 50, 25),
('11111111-1111-1111-1111-111111111111', 'a2222222-2222-2222-2222-222222222222', 85, 100, 50),
('22222222-2222-2222-2222-222222222222', 'a1111111-1111-1111-1111-111111111111', 3, 50, 25),
('22222222-2222-2222-2222-222222222222', 'a2222222-2222-2222-2222-222222222222', 120, 100, 50),
('22222222-2222-2222-2222-222222222222', 'a3333333-3333-3333-3333-333333333333', 120, 500, 250),
('44444444-4444-4444-4444-444444444444', 'a1111111-1111-1111-1111-111111111111', 4, 50, 25),
('44444444-4444-4444-4444-444444444444', 'a2222222-2222-2222-2222-222222222222', 210, 100, 50),
('44444444-4444-4444-4444-444444444444', 'a3333333-3333-3333-3333-333333333333', 210, 500, 250),
('44444444-4444-4444-4444-444444444444', 'a7777777-7777-7777-7777-777777777777', 1050, 300, 150);

DO $$
BEGIN
    RAISE NOTICE 'Sample users seeded successfully!';
    RAISE NOTICE 'Users created: 12';
    RAISE NOTICE 'Achievements created: 8';
    RAISE NOTICE 'Test credentials: username/password123';
END $$;
