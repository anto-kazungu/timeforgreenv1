-- =================================================
-- TIMEFORGREEN SEED DATA
-- PostgreSQL UUIDs generated automatically
-- =================================================

-- Insert Users
INSERT INTO users (email, password_hash, first_name, last_name, role, phone, location, bio, xp, green_points, level, is_active, email_verified)
VALUES
('admin@timeforgreen.org', 'hashedpassword1', 'System', 'Admin', 'admin', '0700000000', 'Nairobi', 'Platform administrator', 500, 300, 5, TRUE, TRUE),

('mentor.jane@timeforgreen.org', 'hashedpassword2', 'Jane', 'Mwangi', 'mentor', '0711223344', 'Nakuru', 'Environmental mentor & trainer', 350, 120, 4, TRUE, TRUE),

('member.john@timeforgreen.org', 'hashedpassword3', 'John', 'Otieno', 'member', '0788991122', 'Kisumu', 'Passionate youth involved in tree planting initiatives.', 120, 45, 2, TRUE, FALSE);


-- =================================================
-- Communities
-- =================================================
INSERT INTO communities (name, description, organizer_id, location, category, image_url, member_count)
VALUES
('Green Warriors Kenya', 'A youth-driven group focused on tree planting and sustainability.', 
    (SELECT id FROM users WHERE email='mentor.jane@timeforgreen.org'),
    'Nakuru', 'Tree Planting', 'https://example.com/community1.jpg', 1
),

('Eco Innovators Hub', 'A tech + environment community encouraging digital environmental activism.',
    (SELECT id FROM users WHERE email='admin@timeforgreen.org'),
    'Nairobi', 'Tech for Nature', 'https://example.com/community2.jpg', 1
);


-- Community Members
INSERT INTO community_members (community_id, user_id, role)
VALUES
((SELECT id FROM communities WHERE name='Green Warriors Kenya'),
 (SELECT id FROM users WHERE email='member.john@timeforgreen.org'),
 'member'),

((SELECT id FROM communities WHERE name='Eco Innovators Hub'),
 (SELECT id FROM users WHERE email='mentor.jane@timeforgreen.org'),
 'moderator');


-- =================================================
-- Community Posts
-- =================================================
INSERT INTO community_posts (community_id, author_id, title, content, image_url)
VALUES
((SELECT id FROM communities WHERE name='Green Warriors Kenya'),
 (SELECT id FROM users WHERE email='member.john@timeforgreen.org'),
 'Tree Planting Success!',
 'Today we planted 200 seedlings at the lakeside forest area.',
 'https://example.com/post1.jpg'),

((SELECT id FROM communities WHERE name='Eco Innovators Hub'),
 (SELECT id FROM users WHERE email='mentor.jane@timeforgreen.org'),
 'Using Tech to Track Trees',
 'Exploring how ICT tools can support environmental conservation.',
 'https://example.com/post2.jpg');


-- Likes
INSERT INTO post_likes (post_id, user_id)
VALUES
((SELECT id FROM community_posts WHERE title='Tree Planting Success!'),
 (SELECT id FROM users WHERE email='admin@timeforgreen.org'));


-- Comments
INSERT INTO post_comments (post_id, user_id, content)
VALUES
((SELECT id FROM community_posts WHERE title='Tree Planting Success!'),
 (SELECT id FROM users WHERE email='mentor.jane@timeforgreen.org'),
 'Amazing work! Keep it up.');


-- =================================================
-- Events
-- =================================================
INSERT INTO events (title, description, organizer_id, community_id, location, event_date, duration, max_participants, category, xp_reward, green_points_reward)
VALUES
('Nakuru Forest Cleanup', 'A full-day forest cleanup and awareness event.',
    (SELECT id FROM users WHERE email='mentor.jane@timeforgreen.org'),
    (SELECT id FROM communities WHERE name='Green Warriors Kenya'),
    'Nakuru Forest',
    CURRENT_TIMESTAMP + INTERVAL '7 days',
    240,
    50,
    'Cleanup',
    80,
    40
);


INSERT INTO event_participants (event_id, user_id, status)
VALUES
((SELECT id FROM events WHERE title='Nakuru Forest Cleanup'),
 (SELECT id FROM users WHERE email='member.john@timeforgreen.org'),
 'registered');


-- =================================================
-- Training Modules
-- =================================================
INSERT INTO training_modules (title, description, mentor_id, mentor_name, expertise_area, level, duration, rating, status)
VALUES
('Basics of Tree Planting', 'Learn how to plant and maintain healthy trees.',
 (SELECT id FROM users WHERE email='mentor.jane@timeforgreen.org'),
 'Jane Mwangi', 'Tree Planting', 'beginner', 120, 4.5, 'published'),

('Digital Advocacy for Conservation', 'Using social media and digital tools for environmental awareness.',
 (SELECT id FROM users WHERE email='admin@timeforgreen.org'),
 'System Admin', 'Digital Activism', 'intermediate', 150, 4.8, 'published');


-- Topics
INSERT INTO training_topics (module_id, topic)
VALUES
((SELECT id FROM training_modules WHERE title='Basics of Tree Planting'),
 'Soil preparation'),
((SELECT id FROM training_modules WHERE title='Basics of Tree Planting'),
 'Selecting seedlings'),
((SELECT id FROM training_modules WHERE title='Digital Advocacy for Conservation'),
 'Social media techniques'),
((SELECT id FROM training_modules WHERE title='Digital Advocacy for Conservation'),
 'Campaign strategies');


-- Resources
INSERT INTO training_resources (module_id, type, title, url)
VALUES
((SELECT id FROM training_modules WHERE title='Basics of Tree Planting'),
 'video', 'Tree Planting Tutorial', 'https://example.com/treeplanting.mp4'),

((SELECT id FROM training_modules WHERE title='Digital Advocacy for Conservation'),
 'document', 'Digital Advocacy Guide', 'https://example.com/advocacy.pdf');


-- =================================================
-- Donations & Projects
-- =================================================
INSERT INTO donation_projects (title, description, category, organizer_id, organizer_name, location, target_amount, current_amount)
VALUES
('Restore Mau Forest', 'Large-scale project to restore degraded forest areas.', 'Reforestation',
 (SELECT id FROM users WHERE email='admin@timeforgreen.org'), 'System Admin', 'Mau Forest',
 1000000, 250000);


INSERT INTO donations (project_id, donor_id, donor_name, amount, payment_method, transaction_id)
VALUES
((SELECT id FROM donation_projects WHERE title='Restore Mau Forest'),
 (SELECT id FROM users WHERE email='member.john@timeforgreen.org'),
 'John Otieno', 500, 'Mpesa', 'TXN12345');


-- =================================================
-- Rewards
-- =================================================
INSERT INTO rewards (name, description, category, green_points_cost, stock, image_url)
VALUES
('Eco Badge Bronze', 'Awarded for 100 green points.', 'badge', 100, 100, 'https://example.com/badge1.png'),
('Eco T-shirt', 'Organic cotton T-shirt for active contributors.', 'merch', 300, 50, 'https://example.com/tshirt.png');


-- =================================================
-- Achievements
-- =================================================
INSERT INTO achievements (name, description, icon, category, xp_requirement, criteria)
VALUES
('Green Starter', 'Earned after first 50 XP.', 'leaf', 'milestone', 50, '{"xp": 50}'),

('Tree Champion', 'Plant 100 trees.', 'tree', 'impact', 0, '{"trees_planted": 100}');


-- Sample Earned Achievement
INSERT INTO user_achievements (user_id, achievement_id)
VALUES
((SELECT id FROM users WHERE email='member.john@timeforgreen.org'),
 (SELECT id FROM achievements WHERE name='Green Starter'));
