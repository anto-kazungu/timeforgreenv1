# TimeForGreen Backend

## 🌱 Complete PostgreSQL Database Setup for Member Flow

This directory contains a production-ready PostgreSQL database setup for the TimeForGreen platform's member flow, including schema definitions, sample data, setup scripts, and comprehensive API integration guides.

## 📚 Quick Navigation

### 🚀 Getting Started
- **[QUICK_START.md](QUICK_START.md)** - Get up and running in 5 minutes
- **[.env.example](.env.example)** - Environment variables template

### 📖 Documentation
- **[database/README.md](database/README.md)** - Main database documentation
- **[DATABASE_SUMMARY.md](database/DATABASE_SUMMARY.md)** - Complete schema overview
- **[ER_DIAGRAM.md](database/ER_DIAGRAM.md)** - Visual entity relationships
- **[API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md)** - Complete API implementation guide

### 💾 Database Files
- **[schema/](database/schema/)** - SQL schema files (tables, indexes, functions)
- **[seeds/](database/seeds/)** - Sample data for testing
- **[scripts/](database/scripts/)** - Setup and utility scripts

## 🎯 What's Included

### Database Schema
- ✅ 13 core tables (users, communities, events, trainings, tree_logs, etc.)
- ✅ 50+ performance indexes
- ✅ 15+ functions and 20+ triggers
- ✅ Full-text search support
- ✅ Automated business logic

### Sample Data
- ✅ 12 test users (all roles)
- ✅ 6 communities
- ✅ 5 training courses
- ✅ 6 events
- ✅ 9 tree planting logs
- ✅ 8 achievements

### Documentation
- ✅ Complete setup guides
- ✅ API integration examples
- ✅ Schema diagrams
- ✅ Sample queries
- ✅ Troubleshooting tips

## 🚀 Quick Setup

### Windows
```powershell
cd database/scripts
.\setup.ps1
```

### Linux/Mac
```bash
cd database/scripts
chmod +x setup.sh
./setup.sh
```

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

## 📊 Database Overview

### Core Tables
1. **users** - User accounts and profiles
2. **user_stats** - Aggregated statistics
3. **communities** - Environmental communities
4. **community_members** - Memberships
5. **tree_logs** - Tree planting records
6. **trainings** - Training programs
7. **user_trainings** - Enrollments
8. **events** - Community events
9. **event_participants** - Attendance
10. **achievements** - Achievement system
11. **user_achievements** - Unlocks
12. **level_definitions** - Leveling system
13. **Full-text search** - Search support

### Key Features
- 🔐 UUID primary keys for security
- 🔄 Automated reward distribution
- 📈 Auto-level calculation
- 🏆 Achievement system
- 📊 Statistics tracking
- 🔍 Full-text search
- ⚡ Performance optimized
- 🛡️ Data integrity constraints

## 🎯 Member Flow Coverage

### Authentication & Profile
- User registration
- Login/logout
- Profile management
- Statistics tracking

### Tree Planting
- Log tree planting
- Track tree codes
- Verify plantings
- Award rewards

### Communities
- Browse communities
- Join/leave communities
- Track participation
- Community stats

### Events
- List events
- Register for events
- Track attendance
- Award rewards

### Trainings
- Browse trainings
- Enroll in courses
- Track progress
- Complete trainings

### Gamification
- XP and leveling (1-10)
- Green points
- Achievements
- Leaderboards

## 📖 Documentation Index

### For Setup
| Document | Purpose |
|----------|---------|
| [QUICK_START.md](QUICK_START.md) | 5-minute setup guide |
| [database/README.md](database/README.md) | Main database docs |
| [.env.example](.env.example) | Environment config |

### For Development
| Document | Purpose |
|----------|---------|
| [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) | Complete API guide with code |
| [database/DATABASE_SUMMARY.md](database/DATABASE_SUMMARY.md) | Schema overview |
| [database/ER_DIAGRAM.md](database/ER_DIAGRAM.md) | Visual relationships |

### For Reference
| Document | Purpose |
|----------|---------|
| [schema/01_create_tables.sql](database/schema/01_create_tables.sql) | Table definitions |
| [schema/02_create_indexes.sql](database/schema/02_create_indexes.sql) | Performance indexes |
| [schema/03_create_functions.sql](database/schema/03_create_functions.sql) | Functions & triggers |

## 🛠️ Tech Stack Recommendations

### Backend Framework
- **Node.js + Express** (recommended)
- Python + FastAPI
- Ruby on Rails

### ORM/Database Client
- **Prisma** (recommended for Node.js)
- TypeORM
- SQLAlchemy (Python)

### Authentication
- JWT + bcrypt
- Passport.js
- OAuth 2.0

### Additional Tools
- Joi/Zod (validation)
- Swagger (API docs)
- Jest (testing)
- Winston (logging)

## 📝 Sample API Endpoints

```
Authentication
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout

User Profile
GET    /api/v1/user/profile
PUT    /api/v1/user/profile
GET    /api/v1/user/stats
GET    /api/v1/user/achievements

Tree Logging
POST   /api/v1/trees/log
GET    /api/v1/trees/logs
GET    /api/v1/trees/search/:code

Communities
GET    /api/v1/communities
GET    /api/v1/communities/:id
POST   /api/v1/communities/:id/join

Events
GET    /api/v1/events
GET    /api/v1/events/:id
POST   /api/v1/events/:id/register

Trainings
GET    /api/v1/trainings
GET    /api/v1/trainings/:id
POST   /api/v1/trainings/:id/enroll
```

See [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) for complete implementation examples.

## 👥 Sample Test Users

All users have password: **password123**

| Username | Role | Level | Trees | Points |
|----------|------|-------|-------|--------|
| john_green | member | 5 | 85 | 425 |
| sarah_eco | member | 6 | 120 | 600 |
| lisa_organizer | organizer | 8 | 300 | 1500 |
| dr_green | mentor | 9 | 400 | 2000 |
| admin | admin | 1 | 0 | 0 |

## 🧪 Testing

### Test Database Connection
```javascript
const { Client } = require('pg');
const client = new Client({
  connectionString: 'postgresql://timeforgreen_user:timeforgreen_pass_2024@localhost:5432/timeforgreen'
});

client.connect()
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Error:', err));
```

### Sample Queries
```sql
-- Get all users
SELECT username, role, xp, level FROM users;

-- Get user with stats
SELECT u.*, s.* FROM users u
LEFT JOIN user_stats s ON s.user_id = u.id
WHERE u.username = 'john_green';

-- Search trees
SELECT * FROM tree_logs WHERE tree_code LIKE 'TREE-2024%';

-- Get upcoming events
SELECT * FROM events WHERE status = 'upcoming' ORDER BY start_time;
```

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL status
pg_isready

# Check if database exists
psql -U postgres -l | grep timeforgreen

# Reset database
psql -U timeforgreen_user -d timeforgreen -f database/scripts/reset.sql
```

### Common Issues
- **Permission denied:** Run `GRANT ALL PRIVILEGES` commands
- **Database doesn't exist:** Run setup script again
- **Connection refused:** Check if PostgreSQL is running
- **Authentication failed:** Verify username and password

## 📈 Performance Tips

1. **Use Indexes:** All common queries are indexed
2. **Pagination:** Use LIMIT and OFFSET for large result sets
3. **Caching:** Cache frequently accessed data (profiles, communities)
4. **Connection Pooling:** Use min: 2, max: 10 connections
5. **Prepared Statements:** Prevent SQL injection and improve performance

## 🔒 Security Best Practices

1. **Never commit .env files**
2. **Use strong passwords in production**
3. **Enable SSL for database connections**
4. **Implement rate limiting**
5. **Validate all user input**
6. **Use parameterized queries**
7. **Regular security audits**
8. **Keep dependencies updated**

## 📦 Deployment Checklist

- [ ] Database created and configured
- [ ] Environment variables set
- [ ] SSL enabled for connections
- [ ] Backups configured
- [ ] Monitoring set up
- [ ] API endpoints implemented
- [ ] Tests written and passing
- [ ] Documentation updated
- [ ] Security audit completed
- [ ] Performance tested

## 🎉 Status

✅ **Database Setup:** Complete  
✅ **Documentation:** Complete  
✅ **Sample Data:** Complete  
✅ **Setup Scripts:** Complete  
⏳ **API Implementation:** Ready to start  
⏳ **Testing:** Ready to start  
⏳ **Deployment:** Ready to start  

## 🚀 Next Steps

1. **Setup Database** - Run setup script (5 minutes)
2. **Test Connection** - Verify database access
3. **Read API Guide** - Review implementation examples
4. **Build API** - Start implementing endpoints
5. **Write Tests** - Add unit and integration tests
6. **Deploy** - Deploy to production

## 📞 Support

For detailed information, see:
- [QUICK_START.md](QUICK_START.md) - Quick setup guide
- [API_INTEGRATION_GUIDE.md](API_INTEGRATION_GUIDE.md) - API implementation
- [database/README.md](database/README.md) - Database documentation

---

**Database Version:** 1.0.0  
**PostgreSQL:** 14+  
**Status:** ✅ Production Ready  
**Last Updated:** December 15, 2024  

**Ready to build! 🌱**
