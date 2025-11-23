# TimeForGreen Backend - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Prerequisites
- PostgreSQL 14+ installed
- Node.js 18+ (if building API)
- Git

### Step 1: Setup Database (2 minutes)

#### Windows
```powershell
cd backend/database/scripts
.\setup.ps1
```

#### Linux/Mac
```bash
cd backend/database/scripts
chmod +x setup.sh
./setup.sh
```

When prompted, type `y` to seed sample data.

### Step 2: Verify Setup (30 seconds)

```bash
# Connect to database
psql -U timeforgreen_user -d timeforgreen

# Check tables
\dt

# Check sample users
SELECT username, role, xp, level FROM users;

# Exit
\q
```

### Step 3: Configure Environment (1 minute)

```bash
# Copy environment template
cp backend/.env.example backend/.env

# Edit .env file with your settings
# (Default values should work for local development)
```

### Step 4: Test Connection (30 seconds)

Create `backend/test-connection.js`:

```javascript
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  port: 5432,
  database: 'timeforgreen',
  user: 'timeforgreen_user',
  password: 'timeforgreen_pass_2024'
});

client.connect()
  .then(() => {
    console.log('✓ Database connected successfully!');
    return client.query('SELECT COUNT(*) FROM users');
  })
  .then(result => {
    console.log(`✓ Found ${result.rows[0].count} users`);
    client.end();
  })
  .catch(err => {
    console.error('✗ Connection failed:', err.message);
    client.end();
  });
```

Run it:
```bash
npm install pg
node backend/test-connection.js
```

### Step 5: Start Building! (1 minute)

You're ready to build your API! Check out:
- `backend/API_INTEGRATION_GUIDE.md` - Complete API implementation guide
- `backend/database/README.md` - Database documentation
- `backend/database/DATABASE_SUMMARY.md` - Schema overview

## 📚 Sample Data

### Test Users (password: password123)

| Username | Role | XP | Level | Trees |
|----------|------|-----|-------|-------|
| john_green | member | 850 | 5 | 85 |
| sarah_eco | member | 1200 | 6 | 120 |
| lisa_organizer | organizer | 3000 | 8 | 300 |
| dr_green | mentor | 4000 | 9 | 400 |
| admin | admin | 0 | 1 | 0 |

### Sample Communities
- Green City Initiative (tree_planting)
- Recycling Champions (recycling)
- Water Warriors (water_conservation)
- Urban Forest Project (tree_planting)

### Sample Activities
- 5 Training courses
- 6 Events (3 upcoming, 3 completed)
- 9 Tree planting logs
- 8 Achievements

## 🔗 Connection Details

```
Host: localhost
Port: 5432
Database: timeforgreen
User: timeforgreen_user
Password: timeforgreen_pass_2024

Connection String:
postgresql://timeforgreen_user:timeforgreen_pass_2024@localhost:5432/timeforgreen
```

## 🛠️ Common Commands

### Database Management
```bash
# Connect to database
psql -U timeforgreen_user -d timeforgreen

# List tables
\dt

# Describe table
\d users

# Run SQL file
psql -U timeforgreen_user -d timeforgreen -f myfile.sql

# Backup database
pg_dump -U timeforgreen_user timeforgreen > backup.sql

# Restore database
psql -U timeforgreen_user -d timeforgreen < backup.sql

# Reset database
psql -U timeforgreen_user -d timeforgreen -f backend/database/scripts/reset.sql
```

### Useful Queries
```sql
-- Get all users with stats
SELECT u.username, u.xp, u.level, u.green_points, u.total_trees_planted,
       s.days_active, s.current_streak
FROM users u
LEFT JOIN user_stats s ON s.user_id = u.id
WHERE u.is_active = true;

-- Get community leaderboard
SELECT u.username, cm.trees_planted, cm.events_attended
FROM community_members cm
JOIN users u ON u.id = cm.user_id
WHERE cm.community_id = 'c1111111-1111-1111-1111-111111111111'
  AND cm.is_active = true
ORDER BY cm.trees_planted DESC
LIMIT 10;

-- Get upcoming events
SELECT e.title, e.start_time, c.name as community,
       e.current_participants, e.max_participants
FROM events e
JOIN communities c ON c.id = e.community_id
WHERE e.status = 'upcoming'
  AND e.start_time > NOW()
ORDER BY e.start_time;

-- Search trees by code
SELECT tl.tree_code, tl.tree_count, tl.species, tl.location,
       u.username, c.name as community
FROM tree_logs tl
JOIN users u ON u.id = tl.user_id
LEFT JOIN communities c ON c.id = tl.community_id
WHERE tl.tree_code LIKE 'TREE-2024%'
ORDER BY tl.created_at DESC;

-- Get user achievements
SELECT a.name, a.icon, a.description, ua.unlocked_at
FROM user_achievements ua
JOIN achievements a ON a.id = ua.achievement_id
WHERE ua.user_id = '11111111-1111-1111-1111-111111111111'
ORDER BY ua.unlocked_at DESC;
```

## 🐛 Troubleshooting

### Can't connect to database
```bash
# Check if PostgreSQL is running
pg_isready

# Check if database exists
psql -U postgres -c "\l" | grep timeforgreen

# Check if user exists
psql -U postgres -c "\du" | grep timeforgreen_user
```

### Permission denied
```sql
-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE timeforgreen TO timeforgreen_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO timeforgreen_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO timeforgreen_user;
```

### Reset everything
```bash
# Drop and recreate database
psql -U postgres -c "DROP DATABASE IF EXISTS timeforgreen;"
psql -U postgres -c "CREATE DATABASE timeforgreen OWNER timeforgreen_user;"

# Run setup again
cd backend/database/scripts
./setup.sh  # or .\setup.ps1 on Windows
```

## 📖 Next Steps

1. **Read Documentation**
   - `backend/database/README.md` - Main docs
   - `backend/API_INTEGRATION_GUIDE.md` - API guide
   - `backend/database/ER_DIAGRAM.md` - Schema diagram

2. **Build API Endpoints**
   - Authentication (register, login)
   - User profile (get, update)
   - Tree logging (create, search)
   - Communities (list, join)
   - Events (list, register)
   - Trainings (list, enroll)

3. **Add Features**
   - Input validation
   - Error handling
   - Rate limiting
   - File uploads
   - Email notifications
   - Real-time updates

4. **Test & Deploy**
   - Write unit tests
   - Write integration tests
   - Set up CI/CD
   - Deploy to production
   - Monitor performance

## 🎯 API Endpoint Checklist

### Authentication
- [ ] POST /api/v1/auth/register
- [ ] POST /api/v1/auth/login
- [ ] POST /api/v1/auth/logout
- [ ] POST /api/v1/auth/refresh

### User
- [ ] GET /api/v1/user/profile
- [ ] PUT /api/v1/user/profile
- [ ] GET /api/v1/user/stats
- [ ] GET /api/v1/user/achievements
- [ ] GET /api/v1/user/level

### Trees
- [ ] POST /api/v1/trees/log
- [ ] GET /api/v1/trees/logs
- [ ] GET /api/v1/trees/search/:code
- [ ] PUT /api/v1/trees/:id
- [ ] DELETE /api/v1/trees/:id

### Communities
- [ ] GET /api/v1/communities
- [ ] GET /api/v1/communities/:id
- [ ] POST /api/v1/communities/:id/join
- [ ] POST /api/v1/communities/:id/leave
- [ ] GET /api/v1/communities/:id/members

### Events
- [ ] GET /api/v1/events
- [ ] GET /api/v1/events/:id
- [ ] POST /api/v1/events/:id/register
- [ ] POST /api/v1/events/:id/cancel
- [ ] GET /api/v1/events/my-events

### Trainings
- [ ] GET /api/v1/trainings
- [ ] GET /api/v1/trainings/:id
- [ ] POST /api/v1/trainings/:id/enroll
- [ ] PUT /api/v1/trainings/:id/progress
- [ ] POST /api/v1/trainings/:id/complete

## 💡 Tips

1. **Use Transactions** for operations that modify multiple tables
2. **Implement Pagination** for list endpoints (limit, offset)
3. **Add Caching** for frequently accessed data
4. **Log Everything** for debugging and monitoring
5. **Validate Input** before database operations
6. **Use Prepared Statements** to prevent SQL injection
7. **Handle Errors Gracefully** with proper status codes
8. **Document Your API** with Swagger/OpenAPI
9. **Write Tests** before deploying to production
10. **Monitor Performance** with query analysis

## 🎉 You're Ready!

Your database is set up and ready for development. Start building your API and bring TimeForGreen to life!

For detailed implementation examples, see `backend/API_INTEGRATION_GUIDE.md`.

---

**Happy Coding! 🌱**
