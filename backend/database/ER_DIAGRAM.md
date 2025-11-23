# TimeForGreen Database - Entity Relationship Diagram

## Database Schema Visualization

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TIMEFORGREEN DATABASE SCHEMA                         │
│                              Member Flow Focus                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│       USERS          │ ◄─────────────────────────────────────┐
├──────────────────────┤                                        │
│ • id (PK)            │                                        │
│ • username (unique)  │                                        │
│ • email (unique)     │                                        │
│ • password_hash      │                                        │
│ • first_name         │                                        │
│ • last_name          │                                        │
│ • bio                │                                        │
│ • role               │                                        │
│ • xp                 │                                        │
│ • level              │                                        │
│ • green_points       │                                        │
│ • total_trees_planted│                                        │
│ • is_active          │                                        │
│ • timestamps         │                                        │
└──────────────────────┘                                        │
         │                                                      │
         │ 1:1                                                  │
         ▼                                                      │
┌──────────────────────┐                                        │
│    USER_STATS        │                                        │
├──────────────────────┤                                        │
│ • id (PK)            │                                        │
│ • user_id (FK)       │                                        │
│ • total_logins       │                                        │
│ • days_active        │                                        │
│ • current_streak     │                                        │
│ • longest_streak     │                                        │
│ • communities_joined │                                        │
│ • events_attended    │                                        │
│ • trainings_completed│                                        │
│ • trees_planted_total│                                        │
│ • achievements_unlocked│                                      │
└──────────────────────┘                                        │
                                                                │
┌──────────────────────┐         ┌──────────────────────┐      │
│    COMMUNITIES       │         │  COMMUNITY_MEMBERS   │      │
├──────────────────────┤         ├──────────────────────┤      │
│ • id (PK)            │ 1:N     │ • id (PK)            │ N:1  │
│ • name               │◄────────┤ • community_id (FK)  ├──────┘
│ • description        │         │ • user_id (FK)       │
│ • location           │         │ • role               │
│ • category           │         │ • trees_planted      │
│ • organizer_id (FK)  ├─────┐   │ • events_attended    │
│ • member_count       │     │   │ • joined_at          │
│ • total_trees_planted│     │   │ • is_active          │
│ • is_active          │     │   └──────────────────────┘
│ • is_featured        │     │
└──────────────────────┘     │
         │                   │
         │ 1:N               │
         ▼                   │
┌──────────────────────┐     │
│       EVENTS         │     │
├──────────────────────┤     │
│ • id (PK)            │     │
│ • community_id (FK)  │     │
│ • organizer_id (FK)  ├─────┘
│ • title              │
│ • description        │
│ • category           │
│ • location           │
│ • start_time         │
│ • end_time           │
│ • max_participants   │
│ • current_participants│
│ • xp_reward          │
│ • green_points_reward│
│ • status             │
│ • is_featured        │
└──────────────────────┘
         │
         │ 1:N
         ▼
┌──────────────────────┐
│ EVENT_PARTICIPANTS   │
├──────────────────────┤
│ • id (PK)            │
│ • event_id (FK)      │
│ • user_id (FK)       ├──────┐
│ • status             │      │
│ • registered_at      │      │
│ • attended_at        │      │
│ • rating             │      │
│ • xp_earned          │      │
│ • green_points_earned│      │
└──────────────────────┘      │
                              │
┌──────────────────────┐      │
│      TREE_LOGS       │      │
├──────────────────────┤      │
│ • id (PK)            │      │
│ • user_id (FK)       ├──────┤
│ • community_id (FK)  │      │
│ • tree_code (unique) │      │
│ • tree_count         │      │
│ • species            │      │
│ • location           │      │
│ • planting_date      │      │
│ • is_verified        │      │
│ • verified_by (FK)   │      │
│ • xp_awarded         │      │
│ • green_points_awarded│     │
└──────────────────────┘      │
                              │
┌──────────────────────┐      │
│     TRAININGS        │      │
├──────────────────────┤      │
│ • id (PK)            │      │
│ • title              │      │
│ • description        │      │
│ • category           │      │
│ • duration_minutes   │      │
│ • difficulty_level   │      │
│ • instructor_id (FK) ├──────┤
│ • xp_reward          │      │
│ • green_points_reward│      │
│ • enrollment_count   │      │
│ • completion_count   │      │
│ • is_active          │      │
│ • is_featured        │      │
└──────────────────────┘      │
         │                    │
         │ 1:N                │
         ▼                    │
┌──────────────────────┐      │
│   USER_TRAININGS     │      │
├──────────────────────┤      │
│ • id (PK)            │      │
│ • user_id (FK)       ├──────┘
│ • training_id (FK)   │
│ • status             │
│ • progress_percentage│
│ • enrolled_at        │
│ • started_at         │
│ • completed_at       │
│ • xp_earned          │
│ • green_points_earned│
└──────────────────────┘

┌──────────────────────┐      ┌──────────────────────┐
│    ACHIEVEMENTS      │      │  USER_ACHIEVEMENTS   │
├──────────────────────┤      ├──────────────────────┤
│ • id (PK)            │ 1:N  │ • id (PK)            │
│ • name (unique)      │◄─────┤ • user_id (FK)       │
│ • description        │      │ • achievement_id (FK)│
│ • icon               │      │ • unlocked_at        │
│ • category           │      │ • progress_value     │
│ • requirement_type   │      │ • xp_earned          │
│ • requirement_value  │      │ • green_points_earned│
│ • xp_reward          │      └──────────────────────┘
│ • green_points_reward│
│ • display_order      │
│ • is_active          │
└──────────────────────┘

┌──────────────────────┐
│  LEVEL_DEFINITIONS   │
├──────────────────────┤
│ • level (PK)         │
│ • name               │
│ • icon               │
│ • color              │
│ • xp_required        │
│ • description        │
└──────────────────────┘
```

## Relationship Summary

### One-to-One (1:1)
- **users** ↔ **user_stats**: Each user has one stats record

### One-to-Many (1:N)
- **users** → **tree_logs**: User can log multiple tree plantings
- **users** → **community_members**: User can join multiple communities
- **users** → **user_trainings**: User can enroll in multiple trainings
- **users** → **event_participants**: User can register for multiple events
- **users** → **user_achievements**: User can unlock multiple achievements
- **users** → **communities** (as organizer): User can organize multiple communities
- **users** → **events** (as organizer): User can organize multiple events
- **users** → **trainings** (as instructor): User can instruct multiple trainings
- **communities** → **community_members**: Community has multiple members
- **communities** → **events**: Community hosts multiple events
- **communities** → **tree_logs**: Community has multiple tree logs
- **events** → **event_participants**: Event has multiple participants
- **trainings** → **user_trainings**: Training has multiple enrollments
- **achievements** → **user_achievements**: Achievement can be unlocked by multiple users

### Many-to-Many (N:M) - Through Junction Tables
- **users** ↔ **communities** (through **community_members**)
- **users** ↔ **events** (through **event_participants**)
- **users** ↔ **trainings** (through **user_trainings**)
- **users** ↔ **achievements** (through **user_achievements**)

## Key Constraints

### Primary Keys (PK)
- All tables use UUID primary keys for security and scalability

### Foreign Keys (FK)
- Maintain referential integrity across all relationships
- ON DELETE CASCADE for dependent records
- ON DELETE RESTRICT for critical references
- ON DELETE SET NULL for optional references

### Unique Constraints
- users: username, email
- tree_logs: tree_code
- achievements: name
- community_members: (community_id, user_id)
- event_participants: (event_id, user_id)
- user_trainings: (user_id, training_id)
- user_achievements: (user_id, achievement_id)

### Check Constraints
- Numeric fields: >= 0 (xp, green_points, tree_count, etc.)
- Level: 1-10
- Rating: 1-5
- Progress percentage: 0-100
- Event times: end_time > start_time
- Enum fields: role, status, category, etc.

## Indexes Summary

### Single Column Indexes
- users: email, username, role, level, xp
- communities: organizer_id, category
- events: community_id, organizer_id, status, start_time
- tree_logs: user_id, community_id, tree_code
- And many more...

### Composite Indexes
- events: (community_id, status, start_time)
- tree_logs: (user_id, created_at DESC)
- event_participants: (user_id, created_at DESC)
- user_trainings: (user_id, enrolled_at DESC)

### Partial Indexes
- Active users only
- Upcoming events only
- Verified tree logs only
- Completed trainings only

### Full-Text Search Indexes (GIN)
- communities.search_vector
- trainings.search_vector
- events.search_vector

## Triggers & Functions

### Automatic Updates
1. **updated_at**: Auto-update on every record modification
2. **user.level**: Auto-calculate from XP
3. **community.member_count**: Auto-update on member join/leave
4. **event.current_participants**: Auto-update on registration/cancellation
5. **training.enrollment_count**: Auto-update on enrollment
6. **training.completion_count**: Auto-update on completion

### Reward Distribution
1. **Tree Logging**: Auto-award XP and green points
2. **Event Attendance**: Auto-award rewards when marked attended
3. **Training Completion**: Auto-award rewards when completed
4. **Achievement Unlock**: Auto-award rewards when unlocked

### Search Vectors
1. **Communities**: Auto-update search_vector on insert/update
2. **Trainings**: Auto-update search_vector on insert/update
3. **Events**: Auto-update search_vector on insert/update

## Data Flow Example

### Tree Planting Flow
```
1. User logs tree planting
   ↓
2. INSERT into tree_logs
   ↓
3. Trigger: award_tree_planting_rewards()
   ↓
4. UPDATE users (xp, green_points, total_trees_planted)
   ↓
5. Trigger: update_user_level()
   ↓
6. UPDATE users (level)
   ↓
7. UPDATE communities (total_trees_planted)
   ↓
8. UPDATE user_stats (trees_planted_total)
   ↓
9. Function: check_user_achievements()
   ↓
10. Possible achievement unlock
```

## Performance Considerations

### Query Optimization
- Use indexes for WHERE, JOIN, ORDER BY clauses
- Avoid SELECT * in production
- Use LIMIT for pagination
- Use prepared statements to prevent SQL injection

### Caching Strategy
- Cache user profiles (5-15 minutes)
- Cache community lists (10-30 minutes)
- Cache leaderboards (5-10 minutes)
- Invalidate cache on updates

### Scaling Recommendations
- Read replicas for > 500K users
- Connection pooling (min: 2, max: 10)
- Partitioning for large tables (events, tree_logs)
- Archive old data (> 2 years)

---

**Note:** This diagram represents the core member flow. Additional tables and relationships may be added for organizer, mentor, donor, and admin flows.
