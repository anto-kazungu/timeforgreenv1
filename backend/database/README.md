# PostgreSQL Database Setup for Member Flow

## Overview
This directory contains the complete PostgreSQL database setup for the TimeForGreen member flow, including schema definitions, seed data, and migration scripts.

## Directory Structure
```
backend/database/
├── README.md                    # This file
├── schema/
│   ├── 01_create_tables.sql    # Core table definitions
│   ├── 02_create_indexes.sql   # Performance indexes
│   └── 03_create_functions.sql # Stored procedures & triggers
├── seeds/
│   ├── 01_seed_users.sql       # Sample user data
│   ├── 02_seed_communities.sql # Sample community data
│   └── 03_seed_activities.sql  # Sample activity data
├── migrations/
│   └── migration_template.sql  # Template for future migrations
└── scripts/
    ├── setup.sh                # Linux/Mac setup script
    ├── setup.ps1               # Windows PowerShell setup script
    └── reset.sql               # Database reset script
```

## Prerequisites
- PostgreSQL 14+ installed
- psql command-line tool
- Database superuser access

## Quick Start

### Windows (PowerShell)
```powershell
cd backend/database/scripts
.\setup.ps1
```

### Linux/Mac
```bash
cd backend/database/scripts
chmod +x setup.sh
./setup.sh
```

### Manual Setup
```bash
# Create database
createdb timeforgreen

# Run schema files
psql -d timeforgreen -f schema/01_create_tables.sql
psql -d timeforgreen -f schema/02_create_indexes.sql
psql -d timeforgreen -f schema/03_create_functions.sql

# Seed data (optional)
psql -d timeforgreen -f seeds/01_seed_users.sql
psql -d timeforgreen -f seeds/02_seed_communities.sql
psql -d timeforgreen -f seeds/03_seed_activities.sql
```

## Database Schema

### Core Tables
1. **users** - User accounts and profiles
2. **communities** - Environmental communities
3. **community_members** - User-community relationships
4. **tree_logs** - Tree planting records
5. **trainings** - Environmental training programs
6. **user_trainings** - User training enrollments
7. **events** - Community events
8. **event_participants** - Event attendance records
9. **achievements** - Achievement definitions
10. **user_achievements** - User achievement unlocks
11. **user_stats** - Aggregated user statistics

### Key Features
- UUID primary keys for security
- Timestamps for audit trails
- Soft deletes where appropriate
- Foreign key constraints
- Check constraints for data integrity
- Indexes for query performance

## Environment Variables
Create a `.env` file in your backend root:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=timeforgreen
DB_USER=timeforgreen_user
DB_PASSWORD=your_secure_password
DB_SSL=false

# Connection pool settings
DB_POOL_MIN=2
DB_POOL_MAX=10
```

## Connection String
```
postgresql://timeforgreen_user:your_secure_password@localhost:5432/timeforgreen
```

## Security Notes
- Never commit `.env` files
- Use strong passwords in production
- Enable SSL for production databases
- Implement row-level security for multi-tenant scenarios
- Regular backups are essential

## Backup & Restore

### Backup
```bash
pg_dump -U timeforgreen_user -d timeforgreen > backup_$(date +%Y%m%d).sql
```

### Restore
```bash
psql -U timeforgreen_user -d timeforgreen < backup_20241215.sql
```

## Troubleshooting

### Connection Issues
```sql
-- Check if database exists
\l

-- Check current connections
SELECT * FROM pg_stat_activity WHERE datname = 'timeforgreen';
```

### Permission Issues
```sql
-- Grant all privileges
GRANT ALL PRIVILEGES ON DATABASE timeforgreen TO timeforgreen_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO timeforgreen_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO timeforgreen_user;
```

## API Integration
This database schema is designed to work with:
- Node.js + Express
- Python + FastAPI
- Any PostgreSQL-compatible ORM (Prisma, TypeORM, SQLAlchemy)

## Next Steps
1. Review schema files in `schema/` directory
2. Customize seed data in `seeds/` directory
3. Run setup script
4. Connect your backend application
5. Implement API endpoints

## Support
For issues or questions, refer to the main project documentation.
