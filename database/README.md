# Just Go Green - PostgreSQL Database Setup

Complete database integration for Just Go Green application.

---

## 📋 Prerequisites

- PostgreSQL 12 or higher
- Node.js 18 or higher
- npm or yarn

---

## 🚀 Quick Start

### 1. Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**macOS:**
```bash
brew install postgresql
brew services start postgresql
```

**Windows:**
Download and install from [PostgreSQL Official Site](https://www.postgresql.org/download/windows/)

### 2. Create Database

```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE justgogreen;

# Create user
CREATE USER justgogreen_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE justgogreen TO justgogreen_user;

# Exit
\q
```

### 3. Run Schema

```bash
# Navigate to database folder
cd database

# Run schema
psql -U justgogreen_user -d justgogreen -f schema.sql

# Run seed data (optional, for development)
psql -U justgogreen_user -d justgogreen -f seed-data.sql
```

---

## 📁 Files Overview

### schema.sql
Complete database schema including:
- **Users & Authentication** - User accounts, sessions
- **Communities** - Communities, members, posts
- **Events** - Environmental events and participants
- **Training** - Modules, resources, enrollments
- **Donations** - Projects, donations, community needs
- **Rewards** - Rewards, redemptions, achievements
- **Transactions** - XP and Green Points tracking
- **Notifications** - User notifications

### seed-data.sql
Test data for development:
- 5 test users (one for each role)
- 3 communities
- 2 events
- 3 training modules
- 3 donation projects
- Sample transactions and notifications

### connection-config.ts
TypeScript configuration for database connection

### migration-guide.md
Step-by-step migration from localStorage to PostgreSQL

---

## 🔧 Environment Configuration

### Create .env file

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=justgogreen
DB_USER=justgogreen_user
DB_PASSWORD=your_secure_password

# Connection Pool
DB_POOL_MIN=2
DB_POOL_MAX=10

# Application
NODE_ENV=development
PORT=3000

# JWT Secret (for authentication)
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:4200
```

---

## 📊 Database Schema Overview

### Core Tables

#### Users (users)
- User accounts with roles
- XP and Green Points tracking
- Profile information

#### Communities (communities)
- Environmental communities
- Member management
- Posts and engagement

#### Events (events)
- Environmental events
- Participant tracking
- Rewards system

#### Training Modules (training_modules)
- Educational content
- Resources and topics
- Enrollment tracking

#### Donations (donations, donation_projects)
- Funding projects
- Donation tracking
- Impact metrics

#### Rewards (rewards, achievements)
- Reward catalog
- Redemptions
- Achievement system

### Supporting Tables

- **Transactions** - XP and Green Points history
- **Notifications** - User notifications
- **Activity Log** - User activity tracking
- **Sessions** - Authentication sessions

---

## 🔐 Security Features

### Implemented
- ✅ Password hashing (use bcrypt in production)
- ✅ UUID primary keys
- ✅ Foreign key constraints
- ✅ Input validation via CHECK constraints
- ✅ Indexes for performance
- ✅ Triggers for auto-updates

### Recommended
- 🔒 SSL/TLS for connections
- 🔒 Row-level security (RLS)
- 🔒 Prepared statements (SQL injection prevention)
- 🔒 Rate limiting
- 🔒 Audit logging

---

## 📈 Performance Optimization

### Indexes Created
- User email, role, XP
- Community and member relationships
- Post and comment lookups
- Event and participant queries
- Training enrollments
- Donation tracking
- Transaction history

### Views for Common Queries
- `user_stats` - User statistics
- `community_stats` - Community metrics
- `project_funding_stats` - Project funding status

---

## 🔄 Migration from localStorage

### Step 1: Export Current Data
```typescript
// Export from localStorage
const users = JSON.parse(localStorage.getItem('users') || '[]');
const communities = JSON.parse(localStorage.getItem('communities') || '[]');
// ... export all data
```

### Step 2: Transform Data
```typescript
// Transform to match database schema
const transformedUsers = users.map(user => ({
  id: uuid(),
  email: user.email,
  // ... map all fields
}));
```

### Step 3: Import to Database
```sql
-- Use COPY or INSERT statements
INSERT INTO users (id, email, ...) VALUES (...);
```

See `migration-guide.md` for detailed instructions.

---

## 🧪 Testing

### Test Accounts (from seed data)

| Role | Email | Password |
|------|-------|----------|
| Member | member@justgogreen.com | password123 |
| Donor | donor@justgogreen.com | password123 |
| Mentor | mentor@justgogreen.com | password123 |
| Organizer | organizer@justgogreen.com | password123 |
| Admin | admin@justgogreen.com | password123 |

### Verify Installation

```sql
-- Check tables
\dt

-- Check users
SELECT email, role FROM users;

-- Check communities
SELECT name, member_count FROM communities;

-- Check views
SELECT * FROM user_stats LIMIT 5;
```

---

## 📝 Common Queries

### Get User with Stats
```sql
SELECT * FROM user_stats WHERE email = 'member@justgogreen.com';
```

### Get Community Members
```sql
SELECT u.first_name, u.last_name, cm.role
FROM community_members cm
JOIN users u ON cm.user_id = u.id
WHERE cm.community_id = 'community-uuid';
```

### Get Project Funding Status
```sql
SELECT * FROM project_funding_stats WHERE id = 'project-uuid';
```

### Get User Activity
```sql
SELECT * FROM activity_log 
WHERE user_id = 'user-uuid' 
ORDER BY created_at DESC 
LIMIT 20;
```

---

## 🔧 Maintenance

### Backup Database
```bash
pg_dump -U justgogreen_user justgogreen > backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
psql -U justgogreen_user justgogreen < backup_20251117.sql
```

### Vacuum and Analyze
```sql
VACUUM ANALYZE;
```

### Check Database Size
```sql
SELECT pg_size_pretty(pg_database_size('justgogreen'));
```

---

## 🐛 Troubleshooting

### Connection Issues
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -U justgogreen_user -d justgogreen -c "SELECT 1"
```

### Permission Issues
```sql
-- Grant all privileges
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO justgogreen_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO justgogreen_user;
```

### Reset Database
```bash
# Drop and recreate
psql -U postgres -c "DROP DATABASE justgogreen"
psql -U postgres -c "CREATE DATABASE justgogreen"
psql -U justgogreen_user -d justgogreen -f schema.sql
psql -U justgogreen_user -d justgogreen -f seed-data.sql
```

---

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node.js PostgreSQL Guide](https://node-postgres.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [Prisma Documentation](https://www.prisma.io/docs/)

---

## 🚀 Next Steps

1. ✅ Install PostgreSQL
2. ✅ Create database and user
3. ✅ Run schema.sql
4. ✅ Run seed-data.sql (optional)
5. ⬜ Configure environment variables
6. ⬜ Install database client library
7. ⬜ Update Angular services
8. ⬜ Test connection
9. ⬜ Migrate existing data
10. ⬜ Deploy to production

---

**Database Version:** 1.0.0  
**Last Updated:** November 17, 2025  
**Status:** ✅ Ready for Integration
