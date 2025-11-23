# TimeForGreen PostgreSQL Database - Complete Summary

## 📋 Overview
Complete PostgreSQL database setup for the TimeForGreen member flow, including schema, indexes, triggers, seed data, and API integration guides.

## 🗂️ Directory Structure
```
backend/
├── database/
│   ├── README.md                           # Main documentation
│   ├── DATABASE_SUMMARY.md                 # This file
│   ├── schema/
│   │   ├── 01_create_tables.sql           # Core table definitions (13 tables)
│   │   ├── 02_create_indexes.sql          # Performance indexes (50+)
│   │   └── 03_create_functions.sql        # Triggers & stored procedures (15+)
│   ├── seeds/
│   │   ├── 01_seed_users.sql              # Sample users & achievements
│   │   ├── 02_seed_communities.sql        # Sample communities
│   │   └── 03_seed_activities.sql         # Sample events, trainings, trees
│   ├── scripts/
│   │   ├── setup.ps1                      # Windows setup script
│   │   ├── setup.sh                       # Linux/Mac setup script
│   │   └── reset.sql                      # Database reset script
│   └── migrations/
│       └── migration_template.sql         # Template for future migrations
├── .env.example                            # Environment variables template
└── API_INTEGRATION_GUIDE.md               # Complete API integration guide

## 📊 Database Schema

### Core Tables (13 Total)

#### 1. users
**Purpose:** User accounts and profiles for all roles
**Key Fields:**
- id (UUID, PK)
- username, email (unique)
- password_hash
- first_name, last_name, bio
- role (member, organizer, mentor, donor, admin)
- xp, level, green_points, total_trees_planted
- is_active, is_verified
- Timestamps: created_at, updated_at, deleted_at

**Indexes:** 7 indexes for performance
**Triggers:** Auto-update level on XP change, initialize user_stats

#### 2. communities
**Purpose:** Environmental communities organized by users
**Key Fields:**
- id (UUID, PK)
- name, description, location
- category (recycling, tree_planting, clean_energy, etc.)
- organizer_id (FK to users)
- member_count, total_trees_planted, total_events
- is_active, is_featured

**Indexes:** 5 indexes
**Triggers:** Auto-update member count

#### 3. community_members
**Purpose:** User membership in communities
**Key Fields:**
- id (UUID, PK)
- community_id (FK), user_id (FK)
- role (member, moderator, organizer)
- trees_planted, events_attended
- joined_at, left_at

**Indexes:** 4 indexes
**Unique Constraint:** (community_id, user_id)

#### 4. tree_logs
**Purpose:** Records of tree planting activities
**Key Fields:**
- id (UUID, PK)
- user_id (FK), community_id (FK)
- tree_code (unique)
- tree_count, species, location
- planting_date
- is_verified, verified_by, verified_at
- xp_awarded, green_points_awarded

**Indexes:** 6 indexes
**Triggers:** Auto-award rewards on insert

#### 5. trainings
**Purpose:** Environmental training programs
**Key Fields:**
- id (UUID, PK)
- title, description, category
- duration_minutes, difficulty_level
- instructor_id (FK), instructor_name
- xp_reward, green_points_reward
- enrollment_count, completion_count
- is_active, is_featured

**Indexes:** 5 indexes

#### 6. user_trainings
**Purpose:** User enrollment and progress in trainings
**Key Fields:**
- id (UUID, PK)
- user_id (FK), training_id (FK)
- status (enrolled, in_progress, completed, dropped)
- progress_percentage
- enrolled_at, started_at, completed_at
- xp_earned, green_points_earned

**Indexes:** 5 indexes
**Triggers:** Auto-award rewards on completion
**Unique Constraint:** (user_id, training_id)

#### 7. events
**Purpose:** Community events and activities
**Key Fields:**
- id (UUID, PK)
- community_id (FK), organizer_id (FK)
- title, description, category
- location, latitude, longitude
- start_time, end_time
- max_participants, current_participants
- xp_reward, green_points_reward
- status (draft, upcoming, ongoing, completed, cancelled)

**Indexes:** 8 indexes including composite
**Triggers:** Auto-update participant count

#### 8. event_participants
**Purpose:** User participation in events
**Key Fields:**
- id (UUID, PK)
- event_id (FK), user_id (FK)
- status (registered, confirmed, attended, cancelled, no_show)
- registered_at, attended_at
- rating (1-5), feedback
- xp_earned, green_points_earned

**Indexes:** 5 indexes
**Triggers:** Auto-award rewards on attendance
**Unique Constraint:** (event_id, user_id)

#### 9. achievements
**Purpose:** Achievement definitions and requirements
**Key Fields:**
- id (UUID, PK)
- name (unique), description, icon
- category, requirement_type, requirement_value
- xp_reward, green_points_reward
- display_order, is_hidden, is_active

**Indexes:** 3 indexes

#### 10. user_achievements
**Purpose:** User achievement unlocks
**Key Fields:**
- id (UUID, PK)
- user_id (FK), achievement_id (FK)
- unlocked_at, progress_value
- xp_earned, green_points_earned

**Indexes:** 3 indexes
**Unique Constraint:** (user_id, achievement_id)

#### 11. user_stats
**Purpose:** Aggregated user statistics for performance
**Key Fields:**
- id (UUID, PK)
- user_id (FK, unique)
- total_logins, days_active
- current_streak, longest_streak
- communities_joined, events_attended
- trainings_completed, trees_planted_total
- achievements_unlocked

**Indexes:** 4 indexes
**Auto-created:** On user registration

#### 12. level_definitions
**Purpose:** Level system definitions (1-10)
**Key Fields:**
- level (INT, PK)
- name, icon, color
- xp_required, description

**Pre-populated:** 10 levels from Rookie to Legend

#### 13. Full-Text Search
**Additional Columns:**
- communities.search_vector (tsvector)
- trainings.search_vector (tsvector)
- events.search_vector (tsvector)

**GIN Indexes:** For fast full-text search

## 🚀 Key Features

### Automated Business Logic
1. **Auto-Level Calculation:** User level updates automatically when XP changes
2. **Reward Distribution:** XP and green points awarded automatically for:
   - Tree planting
   - Event attendance
   - Training completion
   - Achievement unlocks
3. **Counter Updates:** Automatic updates for:
   - Community member counts
   - Event participant counts
   - Training enrollment/completion counts
4. **Achievement Checking:** Function to check and unlock achievements
5. **Stats Tracking:** Automatic user statistics updates

### Performance Optimizations
- **50+ Indexes:** Covering all common query patterns
- **Partial Indexes:** For filtered queries (active users, upcoming events)
- **Composite Indexes:** For complex multi-column queries
- **Full-Text Search:** GIN indexes for text search
- **Materialized Stats:** user_stats table for fast aggregations

### Data Integrity
- **Foreign Key Constraints:** Maintain referential integrity
- **Check Constraints:** Validate data ranges and values
- **Unique Constraints:** Prevent duplicates
- **Soft Deletes:** deleted_at column for data recovery
- **Timestamps:** Automatic created_at and updated_at

## 📦 Sample Data

### Users (12 total)
- 5 Members (john_green, sarah_eco, mike_nature, emma_earth, alex_forest)
- 2 Organizers (lisa_organizer, david_leader)
- 2 Mentors (dr_green, prof_eco)
- 1 Donor (green_corp)
- 1 Admin (admin)
- **Password for all:** password123

### Communities (6 total)
- Green City Initiative (tree_planting, featured)
- Recycling Champions (recycling, featured)
- Clean Energy Advocates (clean_energy)
- Water Warriors (water_conservation, featured)
- Eco Education Hub (education)
- Urban Forest Project (tree_planting, featured)

### Activities
- **Trainings:** 5 courses (composting, water conservation, recycling, solar energy, sustainable living)
- **Events:** 6 events (3 upcoming, 3 completed)
- **Tree Logs:** 9 planting records (450+ trees total)
- **Achievements:** 8 achievements defined

## 🔧 Setup Instructions

### Quick Start (Windows)
```powershell
cd backend/database/scripts
.\setup.ps1
```

### Quick Start (Linux/Mac)
```bash
cd backend/database/scripts
chmod +x setup.sh
./setup.sh
```

### Manual Setup
```bash
# 1. Create database
createdb timeforgreen

# 2. Run schema files
psql -d timeforgreen -f schema/01_create_tables.sql
psql -d timeforgreen -f schema/02_create_indexes.sql
psql -d timeforgreen -f schema/03_create_functions.sql

# 3. Seed data (optional)
psql -d timeforgreen -f seeds/01_seed_users.sql
psql -d timeforgreen -f seeds/02_seed_communities.sql
psql -d timeforgreen -f seeds/03_seed_activities.sql
```

## 🔌 API Integration

### Connection String
```
postgresql://timeforgreen_user:timeforgreen_pass_2024@localhost:5432/timeforgreen
```

### Recommended Stack
- **Backend:** Node.js + Express
- **ORM:** Prisma (recommended) or TypeORM
- **Auth:** JWT with bcrypt
- **Validation:** Joi or Zod
- **Documentation:** Swagger/OpenAPI

### Sample Endpoints
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
GET    /api/v1/user/profile
PUT    /api/v1/user/profile
GET    /api/v1/user/stats
POST   /api/v1/trees/log
GET    /api/v1/trees/logs
GET    /api/v1/trees/search/:code
GET    /api/v1/communities
POST   /api/v1/communities/:id/join
GET    /api/v1/events
POST   /api/v1/events/:id/register
GET    /api/v1/trainings
POST   /api/v1/trainings/:id/enroll
```

See `API_INTEGRATION_GUIDE.md` for complete implementation examples.

## 📈 Performance Metrics

### Expected Query Performance
- User profile lookup: < 10ms
- Tree log search by code: < 5ms
- Community list with filters: < 20ms
- Event list with pagination: < 15ms
- Full-text search: < 50ms
- Leaderboard queries: < 30ms

### Scalability
- **Current Design:** Supports 100K+ users
- **With Optimization:** Can scale to 1M+ users
- **Recommended:** Add read replicas for > 500K users

## 🔒 Security Considerations

### Implemented
- UUID primary keys (prevents enumeration)
- Password hashing (bcrypt)
- Soft deletes (data recovery)
- Audit timestamps
- Foreign key constraints

### Recommended
- Row-level security (RLS) for multi-tenancy
- SSL/TLS for connections
- Regular backups
- Database user with limited privileges
- Input validation at API level
- Rate limiting
- SQL injection prevention (use parameterized queries)

## 🧪 Testing

### Database Tests
```sql
-- Test user creation
SELECT * FROM users WHERE username = 'john_green';

-- Test tree logging rewards
SELECT xp, green_points, total_trees_planted FROM users WHERE id = '11111111-1111-1111-1111-111111111111';

-- Test level calculation
SELECT calculate_user_level(850);

-- Test achievement checking
SELECT check_user_achievements('11111111-1111-1111-1111-111111111111');

-- Test full-text search
SELECT name FROM communities WHERE search_vector @@ to_tsquery('english', 'tree & planting');
```

## 📚 Additional Resources

### Documentation Files
- `README.md` - Main documentation
- `API_INTEGRATION_GUIDE.md` - Complete API guide
- `.env.example` - Environment variables template

### SQL Files
- Schema: 3 files (tables, indexes, functions)
- Seeds: 3 files (users, communities, activities)
- Scripts: 3 files (setup.ps1, setup.sh, reset.sql)

## 🎯 Next Steps

1. **Setup Database:** Run setup script
2. **Test Connection:** Verify database access
3. **Build API:** Implement backend endpoints
4. **Add Validation:** Input validation and error handling
5. **Write Tests:** Unit and integration tests
6. **Document API:** Swagger/OpenAPI documentation
7. **Deploy:** Production deployment
8. **Monitor:** Set up monitoring and logging

## 📞 Support

For issues or questions:
1. Check the README.md file
2. Review API_INTEGRATION_GUIDE.md
3. Test with sample data
4. Check PostgreSQL logs

## ✅ Checklist

- [x] Database schema designed
- [x] Indexes created for performance
- [x] Triggers and functions implemented
- [x] Sample data provided
- [x] Setup scripts created
- [x] API integration guide written
- [x] Environment variables documented
- [ ] API endpoints implemented
- [ ] Tests written
- [ ] Documentation completed
- [ ] Production deployment

---

**Database Version:** 1.0.0  
**Last Updated:** December 15, 2024  
**PostgreSQL Version:** 14+  
**Status:** Ready for Development ✅
