# PostgreSQL Database Integration

Complete PostgreSQL database integration package for Just Go Green application.

---

## 📁 Location

All database files are in the `/database` folder:

```
database/
├── schema.sql                 # Complete database schema
├── seed-data.sql             # Test data
├── connection-config.ts      # TypeScript database client
├── migration-guide.md        # Migration instructions
├── README.md                 # Setup documentation
├── test-connection.ts        # Connection test script
├── package.json              # Dependencies
├── .env.example              # Configuration template
└── INTEGRATION-SUMMARY.md    # Complete overview
```

---

## 🚀 Quick Start

### 1. Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql
brew services start postgresql
```

### 2. Create Database

```bash
sudo -u postgres psql
CREATE DATABASE justgogreen;
CREATE USER justgogreen_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE justgogreen TO justgogreen_user;
\q
```

### 3. Setup

```bash
cd database
npm install
cp .env.example .env
# Edit .env with your credentials
npm run setup
npm run seed
npm run test-connection
```

---

## 📊 What's Included

### Complete Database Schema
- **20+ tables** for all features
- **Foreign keys** for data integrity
- **Indexes** for performance
- **Triggers** for auto-updates
- **Views** for common queries

### Test Data
- 5 test users (all roles)
- 3 communities
- 2 events
- 3 training modules
- 3 donation projects
- Sample transactions

### TypeScript Client
- Connection pooling
- Helper functions
- Transaction support
- Error handling
- Query logging

### Documentation
- Setup guide
- Migration guide
- API examples
- Troubleshooting
- Best practices

---

## 🔧 Key Features

### Tables Cover
- ✅ Users & Authentication
- ✅ Communities & Posts
- ✅ Events & Participants
- ✅ Training & Mentorship
- ✅ Donations & Projects
- ✅ Rewards & Achievements
- ✅ Transactions & Activity
- ✅ Notifications

### Performance
- ✅ Indexed queries
- ✅ Connection pooling
- ✅ Optimized views
- ✅ Efficient joins

### Security
- ✅ UUID primary keys
- ✅ Foreign key constraints
- ✅ Input validation
- ✅ Prepared statements

---

## 📖 Documentation

### Main Files

1. **[database/README.md](../database/README.md)**
   - Installation instructions
   - Configuration guide
   - Common queries
   - Maintenance procedures

2. **[database/migration-guide.md](../database/migration-guide.md)**
   - localStorage to PostgreSQL migration
   - Data transformation
   - Service updates
   - Testing procedures

3. **[database/INTEGRATION-SUMMARY.md](../database/INTEGRATION-SUMMARY.md)**
   - Complete overview
   - All features
   - Quick reference
   - Checklists

---

## 🧪 Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Member | member@justgogreen.com | password123 |
| Donor | donor@justgogreen.com | password123 |
| Mentor | mentor@justgogreen.com | password123 |
| Organizer | organizer@justgogreen.com | password123 |
| Admin | admin@justgogreen.com | password123 |

---

## 🔄 Migration from localStorage

### Step-by-Step

1. **Export** data from localStorage
2. **Transform** to match schema
3. **Import** to PostgreSQL
4. **Update** Angular services
5. **Test** thoroughly

See [migration-guide.md](../database/migration-guide.md) for details.

---

## 📝 Common Operations

### User Operations
```typescript
const user = await getUserByEmail('user@example.com');
const newUser = await createUser({...});
await updateUserXP(userId, 50, 'Completed training');
```

### Training Operations
```typescript
const modules = await getModulesByMentor(mentorId);
await enrollInModule(userId, moduleId);
```

### Donation Operations
```typescript
const projects = await getDonationProjects();
await createDonation({...});
```

---

## 🛠️ NPM Scripts

```bash
npm run setup          # Create schema
npm run seed           # Load test data
npm run test-connection # Test connection
npm run backup         # Create backup
npm run reset          # Reset database
```

---

## 🔐 Security

### Implemented
- UUID primary keys
- Foreign key constraints
- Input validation
- Connection pooling
- Error handling

### Recommended for Production
- SSL/TLS connections
- Row-level security
- Rate limiting
- Audit logging
- Backup encryption

---

## 📈 Performance

### Optimizations
- Indexed columns
- Connection pooling
- Query caching
- Batch operations
- Optimized views

### Monitoring
- Query logging
- Connection metrics
- Error tracking
- Performance stats

---

## 🆘 Troubleshooting

### Connection Issues
```bash
sudo systemctl status postgresql
psql -U justgogreen_user -d justgogreen -c "SELECT 1"
```

### Permission Issues
```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO justgogreen_user;
```

### Reset Database
```bash
npm run reset
```

---

## 📚 Additional Resources

- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Node-Postgres Guide](https://node-postgres.com/)
- [Database Schema](../database/schema.sql)
- [Connection Config](../database/connection-config.ts)

---

## ✅ Integration Checklist

### Setup
- [ ] PostgreSQL installed
- [ ] Database created
- [ ] Schema applied
- [ ] Seed data loaded
- [ ] Connection tested

### Migration
- [ ] Data exported
- [ ] Data imported
- [ ] Services updated
- [ ] API created
- [ ] Tests passing

### Production
- [ ] SSL enabled
- [ ] Backups configured
- [ ] Monitoring setup
- [ ] Security hardened

---

## 🎯 Next Steps

1. Review [database/README.md](../database/README.md)
2. Install PostgreSQL
3. Run setup scripts
4. Test connection
5. Create backend API
6. Update Angular services
7. Migrate data
8. Deploy

---

**Status:** ✅ Ready for Integration  
**Version:** 1.0.0  
**Location:** `/database` folder

**See [database/INTEGRATION-SUMMARY.md](../database/INTEGRATION-SUMMARY.md) for complete details.**
