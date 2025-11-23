-- TimeForGreen Sample Activities (Trainings, Events, Tree Logs)

-- ============================================================================
-- TRAININGS
-- ============================================================================
INSERT INTO trainings (id, title, description, category, duration_minutes, difficulty_level, instructor_id, instructor_name, xp_reward, green_points_reward, enrollment_count, completion_count, is_active, is_featured) VALUES
('t1111111-1111-1111-1111-111111111111', 'Introduction to Composting', 'Learn the basics of home composting and turn your kitchen waste into nutrient-rich soil for your garden.', 'composting', 45, 'beginner', '88888888-8888-8888-8888-888888888888', 'Dr. Maria Green', 100, 50, 0, 0, true, true),
('t2222222-2222-2222-2222-222222222222', 'Water Conservation Techniques', 'Practical methods to reduce water consumption at home and in your community.', 'water_conservation', 60, 'beginner', '99999999-9999-9999-9999-999999999999', 'Prof. James Eco', 120, 60, 0, 0, true, true),
('t3333333-3333-3333-3333-333333333333', 'Advanced Recycling Methods', 'Deep dive into recycling processes, materials identification, and waste management systems.', 'recycling', 90, 'intermediate', '88888888-8888-8888-8888-888888888888', 'Dr. Maria Green', 200, 100, 0, 0, true, false),
('t4444444-4444-4444-4444-444444444444', 'Solar Energy for Homes', 'Understanding solar panel systems, installation, and maintenance for residential use.', 'energy_efficiency', 120, 'intermediate', '99999999-9999-9999-9999-999999999999', 'Prof. James Eco', 250, 125, 0, 0, true, true),
('t5555555-5555-5555-5555-555555555555', 'Sustainable Living Practices', 'Comprehensive guide to reducing your environmental footprint through daily choices.', 'sustainable_living', 75, 'beginner', '88888888-8888-8888-8888-888888888888', 'Dr. Maria Green', 150, 75, 0, 0, true, true);

-- Insert training enrollments
INSERT INTO user_trainings (user_id, training_id, status, progress_percentage, enrolled_at, started_at, completed_at, xp_earned, green_points_earned) VALUES
('11111111-1111-1111-1111-111111111111', 't1111111-1111-1111-1111-111111111111', 'completed', 100, CURRENT_TIMESTAMP - INTERVAL '15 days', CURRENT_TIMESTAMP - INTERVAL '14 days', CURRENT_TIMESTAMP - INTERVAL '10 days', 100, 50),
('11111111-1111-1111-1111-111111111111', 't2222222-2222-2222-2222-222222222222', 'in_progress', 60, CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '4 days', NULL, 0, 0),
('22222222-2222-2222-2222-222222222222', 't1111111-1111-1111-1111-111111111111', 'completed', 100, CURRENT_TIMESTAMP - INTERVAL '20 days', CURRENT_TIMESTAMP - INTERVAL '19 days', CURRENT_TIMESTAMP - INTERVAL '15 days', 100, 50),
('22222222-2222-2222-2222-222222222222', 't3333333-3333-3333-3333-333333333333', 'completed', 100, CURRENT_TIMESTAMP - INTERVAL '12 days', CURRENT_TIMESTAMP - INTERVAL '11 days', CURRENT_TIMESTAMP - INTERVAL '8 days', 200, 100),
('33333333-3333-3333-3333-333333333333', 't5555555-5555-5555-5555-555555555555', 'enrolled', 0, CURRENT_TIMESTAMP - INTERVAL '2 days', NULL, NULL, 0, 0),
('44444444-4444-4444-4444-444444444444', 't1111111-1111-1111-1111-111111111111', 'completed', 100, CURRENT_TIMESTAMP - INTERVAL '25 days', CURRENT_TIMESTAMP - INTERVAL '24 days', CURRENT_TIMESTAMP - INTERVAL '20 days', 100, 50),
('44444444-4444-4444-4444-444444444444', 't2222222-2222-2222-2222-222222222222', 'completed', 100, CURRENT_TIMESTAMP - INTERVAL '18 days', CURRENT_TIMESTAMP - INTERVAL '17 days', CURRENT_TIMESTAMP - INTERVAL '14 days', 120, 60),
('44444444-4444-4444-4444-444444444444', 't4444444-4444-4444-4444-444444444444', 'completed', 100, CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '9 days', CURRENT_TIMESTAMP - INTERVAL '5 days', 250, 125);

-- ============================================================================
-- EVENTS
-- ============================================================================
INSERT INTO events (id, community_id, organizer_id, title, description, category, location, start_time, end_time, max_participants, current_participants, xp_reward, green_points_reward, status, is_featured) VALUES
-- Upcoming events
('e1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666666', 'Community Tree Planting Day', 'Join us for a day of tree planting in Karura Forest. All materials provided!', 'tree_planting', 'Karura Forest, Nairobi', CURRENT_TIMESTAMP + INTERVAL '7 days', CURRENT_TIMESTAMP + INTERVAL '7 days' + INTERVAL '6 hours', 50, 0, 150, 75, 'upcoming', true),
('e2222222-2222-2222-2222-222222222222', 'c2222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 'Beach Cleanup Drive', 'Help us clean Diani Beach and protect marine life from plastic pollution.', 'cleanup', 'Diani Beach, Mombasa', CURRENT_TIMESTAMP + INTERVAL '10 days', CURRENT_TIMESTAMP + INTERVAL '10 days' + INTERVAL '4 hours', 30, 0, 100, 50, 'upcoming', true),
('e3333333-3333-3333-3333-333333333333', 'c5555555-5555-5555-5555-555555555555', '66666666-6666-6666-6666-666666666666', 'Environmental Awareness Workshop', 'Interactive workshop on climate change and sustainable living for all ages.', 'workshop', 'Community Center, Eldoret', CURRENT_TIMESTAMP + INTERVAL '14 days', CURRENT_TIMESTAMP + INTERVAL '14 days' + INTERVAL '3 hours', 100, 0, 80, 40, 'upcoming', false),

-- Completed events
('e4444444-4444-4444-4444-444444444444', 'c1111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666666', 'Urban Forest Initiative', 'Planted 200 trees in city parks and public spaces.', 'tree_planting', 'City Parks, Nairobi', CURRENT_TIMESTAMP - INTERVAL '15 days', CURRENT_TIMESTAMP - INTERVAL '15 days' + INTERVAL '5 hours', 40, 35, 150, 75, 'completed', false),
('e5555555-5555-5555-5555-555555555555', 'c2222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 'Recycling Education Fair', 'Community fair teaching proper recycling techniques and waste sorting.', 'awareness', 'Town Square, Mombasa', CURRENT_TIMESTAMP - INTERVAL '8 days', CURRENT_TIMESTAMP - INTERVAL '8 days' + INTERVAL '4 hours', 60, 45, 100, 50, 'completed', false),
('e6666666-6666-6666-6666-666666666666', 'c6666666-6666-6666-6666-666666666666', '77777777-7777-7777-7777-777777777777', 'Neighborhood Green Spaces', 'Created green spaces in urban neighborhoods with native plants.', 'tree_planting', 'Various Locations, Nairobi', CURRENT_TIMESTAMP - INTERVAL '20 days', CURRENT_TIMESTAMP - INTERVAL '20 days' + INTERVAL '6 hours', 35, 30, 150, 75, 'completed', false);

-- Insert event participants
INSERT INTO event_participants (event_id, user_id, status, attended_at, rating, xp_earned, green_points_earned) VALUES
-- Upcoming event registrations
('e1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'registered', NULL, NULL, 0, 0),
('e1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'confirmed', NULL, NULL, 0, 0),
('e1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'registered', NULL, NULL, 0, 0),
('e2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'registered', NULL, NULL, 0, 0),
('e2222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'registered', NULL, NULL, 0, 0),

-- Completed event attendance
('e4444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'attended', CURRENT_TIMESTAMP - INTERVAL '15 days', 5, 150, 75),
('e4444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'attended', CURRENT_TIMESTAMP - INTERVAL '15 days', 5, 150, 75),
('e4444444-4444-4444-4444-444444444444', '33333333-3333-3333-3333-333333333333', 'attended', CURRENT_TIMESTAMP - INTERVAL '15 days', 4, 150, 75),
('e4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'attended', CURRENT_TIMESTAMP - INTERVAL '15 days', 5, 150, 75),
('e5555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'attended', CURRENT_TIMESTAMP - INTERVAL '8 days', 4, 100, 50),
('e5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'attended', CURRENT_TIMESTAMP - INTERVAL '8 days', 5, 100, 50),
('e6666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'attended', CURRENT_TIMESTAMP - INTERVAL '20 days', 5, 150, 75),
('e6666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'attended', CURRENT_TIMESTAMP - INTERVAL '20 days', 5, 150, 75);

-- ============================================================================
-- TREE LOGS
-- ============================================================================
INSERT INTO tree_logs (id, user_id, community_id, tree_code, tree_count, species, location, planting_date, is_verified, verified_by, verified_at, xp_awarded, green_points_awarded) VALUES
('l1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'TREE-2024-001-JG', 10, 'Acacia', 'Karura Forest', CURRENT_DATE - 30, true, '66666666-6666-6666-6666-666666666666', CURRENT_TIMESTAMP - INTERVAL '28 days', 100, 50),
('l2222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111111', 'TREE-2024-002-JG', 15, 'Eucalyptus', 'City Park', CURRENT_DATE - 20, true, '66666666-6666-6666-6666-666666666666', CURRENT_TIMESTAMP - INTERVAL '18 days', 150, 75),
('l3333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'c6666666-6666-6666-6666-666666666666', 'TREE-2024-003-JG', 20, 'Indigenous Mix', 'Neighborhood Park', CURRENT_DATE - 10, true, '77777777-7777-7777-7777-777777777777', CURRENT_TIMESTAMP - INTERVAL '8 days', 200, 100),
('l4444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 'TREE-2024-004-SE', 25, 'Acacia', 'Karura Forest', CURRENT_DATE - 25, true, '66666666-6666-6666-6666-666666666666', CURRENT_TIMESTAMP - INTERVAL '23 days', 250, 125),
('l5555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'c1111111-1111-1111-1111-111111111111', 'TREE-2024-005-SE', 30, 'Pine', 'Mountain Area', CURRENT_DATE - 15, true, '66666666-6666-6666-6666-666666666666', CURRENT_TIMESTAMP - INTERVAL '13 days', 300, 150),
('l6666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'c1111111-1111-1111-1111-111111111111', 'TREE-2024-006-MN', 12, 'Fruit Trees', 'Community Garden', CURRENT_DATE - 18, true, '66666666-6666-6666-6666-666666666666', CURRENT_TIMESTAMP - INTERVAL '16 days', 120, 60),
('l7777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', 'c1111111-1111-1111-1111-111111111111', 'TREE-2024-007-EE', 40, 'Indigenous Mix', 'Karura Forest', CURRENT_DATE - 35, true, '66666666-6666-6666-6666-666666666666', CURRENT_TIMESTAMP - INTERVAL '33 days', 400, 200),
('l8888888-8888-8888-8888-888888888888', '44444444-4444-4444-4444-444444444444', 'c6666666-6666-6666-6666-666666666666', 'TREE-2024-008-EE', 50, 'Acacia', 'Urban Forest', CURRENT_DATE - 22, true, '77777777-7777-7777-7777-777777777777', CURRENT_TIMESTAMP - INTERVAL '20 days', 500, 250),
('l9999999-9999-9999-9999-999999999999', '55555555-5555-5555-5555-555555555555', NULL, 'TREE-2024-009-AF', 5, 'Fruit Trees', 'Home Garden', CURRENT_DATE - 5, false, NULL, NULL, 50, 25);

DO $$
BEGIN
    RAISE NOTICE 'Sample activities seeded successfully!';
    RAISE NOTICE 'Trainings created: 5';
    RAISE NOTICE 'Training enrollments: 8';
    RAISE NOTICE 'Events created: 6';
    RAISE NOTICE 'Event participants: 13';
    RAISE NOTICE 'Tree logs created: 9';
END $$;
