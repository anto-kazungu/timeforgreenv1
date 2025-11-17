-- Just Go Green - Seed Data
-- Test data for development and testing

-- ============================================
-- USERS
-- ============================================

-- Password: all accounts use 'password123' (hashed)
-- In production, use proper password hashing (bcrypt, argon2, etc.)

INSERT INTO users (id, email, password_hash, first_name, last_name, role, xp, green_points, level) VALUES
('11111111-1111-1111-1111-111111111111', 'member@justgogreen.com', '$2b$10$hash', 'John', 'Member', 'member', 500, 250, 3),
('22222222-2222-2222-2222-222222222222', 'donor@justgogreen.com', '$2b$10$hash', 'Sarah', 'Donor', 'donor', 1200, 600, 5),
('33333333-3333-3333-3333-333333333333', 'mentor@justgogreen.com', '$2b$10$hash', 'Dr. James', 'Mentor', 'mentor', 2000, 1000, 7),
('44444444-4444-4444-4444-444444444444', 'organizer@justgogreen.com', '$2b$10$hash', 'Maria', 'Organizer', 'organizer', 1500, 750, 6),
('55555555-5555-5555-5555-555555555555', 'admin@justgogreen.com', '$2b$10$hash', 'Admin', 'User', 'admin', 3000, 1500, 9);

-- ============================================
-- COMMUNITIES
-- ============================================

INSERT INTO communities (id, name, description, organizer_id, location, category, member_count) VALUES
('c1111111-1111-1111-1111-111111111111', 'Campus Eco Warriors', 'University students committed to campus sustainability', '44444444-4444-4444-4444-444444444444', 'Nairobi University', 'Education', 45),
('c2222222-2222-2222-2222-222222222222', 'Green Chances Initiative', 'Community-led environmental action group', '44444444-4444-4444-4444-444444444444', 'Mombasa', 'Community', 32),
('c3333333-3333-3333-3333-333333333333', 'Urban Forest Project', 'Planting trees in urban areas', '44444444-4444-4444-4444-444444444444', 'Kisumu', 'Conservation', 28);

-- Community members
INSERT INTO community_members (community_id, user_id, role) VALUES
('c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'member'),
('c1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'member'),
('c2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'member'),
('c3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'moderator');

-- ============================================
-- EVENTS
-- ============================================

INSERT INTO events (id, title, description, organizer_id, community_id, location, event_date, duration, max_participants, category, xp_reward, green_points_reward, status) VALUES
('e1111111-1111-1111-1111-111111111111', 'Beach Cleanup Drive', 'Join us for a coastal cleanup initiative', '44444444-4444-4444-4444-444444444444', 'c2222222-2222-2222-2222-222222222222', 'Diani Beach', '2025-11-25 09:00:00', 180, 50, 'Cleanup', 50, 25, 'upcoming'),
('e2222222-2222-2222-2222-222222222222', 'Tree Planting Day', 'Plant 100 indigenous trees', '44444444-4444-4444-4444-444444444444', 'c3333333-3333-3333-3333-333333333333', 'Karura Forest', '2025-11-30 08:00:00', 240, 100, 'Planting', 75, 40, 'upcoming');

-- ============================================
-- TRAINING MODULES
-- ============================================

INSERT INTO training_modules (id, title, description, mentor_id, mentor_name, expertise_area, level, duration, enrolled_count, rating, status) VALUES
('m1111111-1111-1111-1111-111111111111', 'Environmental Law Basics', 'Understanding environmental regulations and community rights', '33333333-3333-3333-3333-333333333333', 'Dr. James Mentor', 'environmental-law', 'beginner', 90, 45, 4.8, 'published'),
('m2222222-2222-2222-2222-222222222222', 'Sustainable Forestry Management', 'Best practices for forest conservation', '33333333-3333-3333-3333-333333333333', 'Dr. James Mentor', 'forestry', 'intermediate', 120, 32, 4.9, 'published'),
('m3333333-3333-3333-3333-333333333333', 'Climate Change Adaptation', 'Strategies for climate resilience', '33333333-3333-3333-3333-333333333333', 'Dr. James Mentor', 'climate-science', 'advanced', 150, 28, 4.7, 'published');

-- Training topics
INSERT INTO training_topics (module_id, topic) VALUES
('m1111111-1111-1111-1111-111111111111', 'Environmental Rights'),
('m1111111-1111-1111-1111-111111111111', 'Regulations'),
('m1111111-1111-1111-1111-111111111111', 'Community Protection'),
('m2222222-2222-2222-2222-222222222222', 'Forest Management'),
('m2222222-2222-2222-2222-222222222222', 'Conservation'),
('m2222222-2222-2222-2222-222222222222', 'Biodiversity');

-- Training resources
INSERT INTO training_resources (module_id, type, title, url, description, order_index) VALUES
('m1111111-1111-1111-1111-111111111111', 'video', 'Introduction to Environmental Law', 'https://example.com/video1', 'Overview of key environmental laws', 1),
('m1111111-1111-1111-1111-111111111111', 'document', 'Legal Framework Guide', 'https://example.com/doc1', 'Comprehensive guide', 2),
('m2222222-2222-2222-2222-222222222222', 'video', 'Forest Conservation Techniques', 'https://example.com/video2', 'Practical conservation methods', 1);

-- Module enrollments
INSERT INTO module_enrollments (module_id, user_id, progress, status) VALUES
('m1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 100, 'completed'),
('m2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 45, 'in-progress'),
('m1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 60, 'in-progress');

-- ============================================
-- CONSULTATION SESSIONS
-- ============================================

INSERT INTO consultation_sessions (id, title, description, mentor_id, mentor_name, expertise_area, session_date, duration, max_attendees, meeting_link, status) VALUES
('s1111111-1111-1111-1111-111111111111', 'Q&A: Environmental Law for Activists', 'Open consultation for community activists', '33333333-3333-3333-3333-333333333333', 'Dr. James Mentor', 'environmental-law', '2025-11-25 14:00:00', 60, 20, 'https://meet.example.com/session1', 'scheduled');

-- Session topics
INSERT INTO session_topics (session_id, topic) VALUES
('s1111111-1111-1111-1111-111111111111', 'Legal Rights'),
('s1111111-1111-1111-1111-111111111111', 'Community Action');

-- ============================================
-- DONATION PROJECTS
-- ============================================

INSERT INTO donation_projects (id, title, description, category, organizer_id, organizer_name, location, target_amount, current_amount, donor_count, start_date, end_date, status) VALUES
('p1111111-1111-1111-1111-111111111111', 'Solar Panels for Rural Schools', 'Installing solar systems in 10 rural schools', 'renewable-energy', '44444444-4444-4444-4444-444444444444', 'Maria Organizer', 'Rural Kenya', 50000.00, 32500.00, 45, '2024-01-01', '2024-12-31', 'active'),
('p2222222-2222-2222-2222-222222222222', 'Community Recycling Center', 'Building a modern recycling facility', 'waste-management', '44444444-4444-4444-4444-444444444444', 'Maria Organizer', 'Nairobi', 75000.00, 18750.00, 23, '2024-02-01', '2025-01-31', 'active'),
('p3333333-3333-3333-3333-333333333333', 'Urban Tree Planting Initiative', 'Planting 1000 indigenous trees', 'tree-planting', '44444444-4444-4444-4444-444444444444', 'Maria Organizer', 'Mombasa', 25000.00, 25000.00, 78, '2024-03-01', '2024-11-30', 'completed');

-- Donations
INSERT INTO donations (project_id, donor_id, donor_name, amount, payment_method, status, donated_at) VALUES
('p1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Sarah Donor', 5000.00, 'Credit Card', 'completed', '2024-11-01 10:30:00'),
('p3333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Sarah Donor', 1000.00, 'Bank Transfer', 'completed', '2024-10-15 14:20:00'),
('p2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Sarah Donor', 2500.00, 'Mobile Money', 'completed', '2024-11-10 09:15:00');

-- ============================================
-- COMMUNITY NEEDS
-- ============================================

INSERT INTO community_needs (id, title, description, category, community_id, community_name, urgency, estimated_cost, funded_amount, backers, status) VALUES
('n1111111-1111-1111-1111-111111111111', 'Water Filtration System', 'Community needs clean drinking water system', 'water-resources', 'c1111111-1111-1111-1111-111111111111', 'Campus Eco Warriors', 'high', 15000.00, 0.00, 0, 'open'),
('n2222222-2222-2222-2222-222222222222', 'Composting Equipment', 'Equipment for community composting program', 'waste-management', 'c2222222-2222-2222-2222-222222222222', 'Green Chances Initiative', 'medium', 8000.00, 2000.00, 3, 'open');

-- ============================================
-- REWARDS
-- ============================================

INSERT INTO rewards (id, name, description, category, green_points_cost, stock) VALUES
('r1111111-1111-1111-1111-111111111111', 'Eco-Friendly Water Bottle', 'Reusable stainless steel water bottle', 'Merchandise', 100, 50),
('r2222222-2222-2222-2222-222222222222', 'Tree Planting Kit', 'Complete kit for planting trees', 'Tools', 250, 30),
('r3333333-3333-3333-3333-333333333333', 'Organic Cotton T-Shirt', 'Just Go Green branded t-shirt', 'Merchandise', 150, 100);

-- ============================================
-- ACHIEVEMENTS
-- ============================================

INSERT INTO achievements (id, name, description, icon, category, xp_requirement) VALUES
('a1111111-1111-1111-1111-111111111111', 'First Steps', 'Complete your first environmental action', 'eco', 'Getting Started', 0),
('a2222222-2222-2222-2222-222222222222', 'Community Builder', 'Join 3 communities', 'people', 'Social', 100),
('a3333333-3333-3333-3333-333333333333', 'Knowledge Seeker', 'Complete 5 training modules', 'school', 'Education', 500),
('a4444444-4444-4444-4444-444444444444', 'Generous Donor', 'Donate to 10 projects', 'volunteer_activism', 'Giving', 1000);

-- User achievements
INSERT INTO user_achievements (user_id, achievement_id) VALUES
('11111111-1111-1111-1111-111111111111', 'a1111111-1111-1111-1111-111111111111'),
('11111111-1111-1111-1111-111111111111', 'a2222222-2222-2222-2222-222222222222'),
('22222222-2222-2222-2222-222222222222', 'a1111111-1111-1111-1111-111111111111'),
('22222222-2222-2222-2222-222222222222', 'a4444444-4444-4444-4444-444444444444');

-- ============================================
-- TRANSACTIONS
-- ============================================

-- XP transactions
INSERT INTO xp_transactions (user_id, amount, reason, reference_type) VALUES
('11111111-1111-1111-1111-111111111111', 50, 'Completed training module', 'training'),
('11111111-1111-1111-1111-111111111111', 75, 'Attended event', 'event'),
('22222222-2222-2222-2222-222222222222', 100, 'Made donation', 'donation');

-- Green Points transactions
INSERT INTO green_points_transactions (user_id, amount, transaction_type, reason, reference_type) VALUES
('11111111-1111-1111-1111-111111111111', 25, 'earned', 'Completed training module', 'training'),
('11111111-1111-1111-1111-111111111111', 40, 'earned', 'Attended event', 'event'),
('22222222-2222-2222-2222-222222222222', 50, 'earned', 'Made donation', 'donation'),
('11111111-1111-1111-1111-111111111111', -100, 'spent', 'Redeemed reward', 'reward');

-- ============================================
-- NOTIFICATIONS
-- ============================================

INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
('11111111-1111-1111-1111-111111111111', 'New Event Available', 'Beach Cleanup Drive is happening soon!', 'event', false),
('11111111-1111-1111-1111-111111111111', 'Module Completed', 'Congratulations on completing Environmental Law Basics!', 'achievement', true),
('22222222-2222-2222-2222-222222222222', 'Donation Received', 'Thank you for your donation to Solar Panels project!', 'donation', false);
