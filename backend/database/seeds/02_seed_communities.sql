-- TimeForGreen Sample Communities and Memberships

-- Insert sample communities
INSERT INTO communities (id, name, description, location, category, organizer_id, member_count, total_trees_planted, is_active, is_featured) VALUES
('c1111111-1111-1111-1111-111111111111', 'Green City Initiative', 'Making our city greener one tree at a time. Join us for weekly tree planting events and environmental workshops.', 'Nairobi, Kenya', 'tree_planting', '66666666-6666-6666-6666-666666666666', 0, 450, true, true),
('c2222222-2222-2222-2222-222222222222', 'Recycling Champions', 'Community dedicated to promoting recycling and waste reduction. We organize collection drives and educational programs.', 'Mombasa, Kenya', 'recycling', '77777777-7777-7777-7777-777777777777', 0, 0, true, true),
('c3333333-3333-3333-3333-333333333333', 'Clean Energy Advocates', 'Promoting renewable energy and sustainable living practices in our community.', 'Kisumu, Kenya', 'clean_energy', '66666666-6666-6666-6666-666666666666', 0, 0, true, false),
('c4444444-4444-4444-4444-444444444444', 'Water Warriors', 'Focused on water conservation and protecting our water sources from pollution.', 'Nakuru, Kenya', 'water_conservation', '77777777-7777-7777-7777-777777777777', 0, 0, true, true),
('c5555555-5555-5555-5555-555555555555', 'Eco Education Hub', 'Teaching environmental awareness to schools and communities through interactive programs.', 'Eldoret, Kenya', 'education', '66666666-6666-6666-6666-666666666666', 0, 0, true, false),
('c6666666-6666-6666-6666-666666666666', 'Urban Forest Project', 'Creating urban forests and green spaces in city neighborhoods.', 'Nairobi, Kenya', 'tree_planting', '77777777-7777-7777-7777-777777777777', 0, 320, true, true);

-- Insert community memberships
INSERT INTO community_members (community_id, user_id, role, trees_planted, events_attended) VALUES
-- Green City Initiative members
('c1111111-1111-1111-1111-111111111111', '66666666-6666-6666-6666-666666666666', 'organizer', 150, 20),
('c1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'member', 85, 12),
('c1111111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'moderator', 120, 15),
('c1111111-1111-1111-1111-111111111111', '33333333-3333-3333-3333-333333333333', 'member', 45, 8),
('c1111111-1111-1111-1111-111111111111', '44444444-4444-4444-4444-444444444444', 'member', 50, 10),

-- Recycling Champions members
('c2222222-2222-2222-2222-222222222222', '77777777-7777-7777-7777-777777777777', 'organizer', 0, 15),
('c2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'member', 0, 10),
('c2222222-2222-2222-2222-222222222222', '55555555-5555-5555-5555-555555555555', 'member', 0, 5),

-- Clean Energy Advocates members
('c3333333-3333-3333-3333-333333333333', '66666666-6666-6666-6666-666666666666', 'organizer', 0, 8),
('c3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'member', 0, 6),

-- Water Warriors members
('c4444444-4444-4444-4444-444444444444', '77777777-7777-7777-7777-777777777777', 'organizer', 0, 12),
('c4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'member', 0, 8),
('c4444444-4444-4444-4444-444444444444', '55555555-5555-5555-5555-555555555555', 'member', 0, 4),

-- Eco Education Hub members
('c5555555-5555-5555-5555-555555555555', '66666666-6666-6666-6666-666666666666', 'organizer', 0, 10),
('c5555555-5555-5555-5555-555555555555', '88888888-8888-8888-8888-888888888888', 'moderator', 0, 8),
('c5555555-5555-5555-5555-555555555555', '99999999-9999-9999-9999-999999999999', 'moderator', 0, 7),

-- Urban Forest Project members
('c6666666-6666-6666-6666-666666666666', '77777777-7777-7777-7777-777777777777', 'organizer', 160, 18),
('c6666666-6666-6666-6666-666666666666', '11111111-1111-1111-1111-111111111111', 'member', 0, 5),
('c6666666-6666-6666-6666-666666666666', '44444444-4444-4444-4444-444444444444', 'member', 160, 14);

DO $$
BEGIN
    RAISE NOTICE 'Sample communities seeded successfully!';
    RAISE NOTICE 'Communities created: 6';
    RAISE NOTICE 'Community memberships: 19';
END $$;
