-- TimeForGreen Database Reset Script
-- WARNING: This will delete ALL data!

-- Disable triggers temporarily
SET session_replication_role = 'replica';

-- Truncate all tables (preserves structure, removes data)
TRUNCATE TABLE user_achievements CASCADE;
TRUNCATE TABLE achievements CASCADE;
TRUNCATE TABLE event_participants CASCADE;
TRUNCATE TABLE events CASCADE;
TRUNCATE TABLE user_trainings CASCADE;
TRUNCATE TABLE trainings CASCADE;
TRUNCATE TABLE tree_logs CASCADE;
TRUNCATE TABLE community_members CASCADE;
TRUNCATE TABLE communities CASCADE;
TRUNCATE TABLE user_stats CASCADE;
TRUNCATE TABLE users CASCADE;

-- Re-enable triggers
SET session_replication_role = 'origin';

-- Reset sequences
ALTER SEQUENCE IF EXISTS users_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS communities_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS events_id_seq RESTART WITH 1;
ALTER SEQUENCE IF EXISTS trainings_id_seq RESTART WITH 1;

-- Re-insert level definitions
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
(10, 'Legend', '⭐', '#FF6F00', 5000, 'Legendary environmental leader')
ON CONFLICT (level) DO NOTHING;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Database reset complete!';
    RAISE NOTICE 'All user data has been removed.';
    RAISE NOTICE 'You can now run seed files to populate sample data.';
END $$;
