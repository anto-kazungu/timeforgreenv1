# Migration Guide: localStorage to PostgreSQL

Step-by-step guide to migrate Just Go Green from localStorage to PostgreSQL database.

---

## 📋 Overview

This guide covers:
1. Installing dependencies
2. Setting up PostgreSQL
3. Migrating existing data
4. Updating Angular services
5. Testing the migration

---

## 🔧 Step 1: Install Dependencies

### Backend Dependencies (if using Node.js backend)

```bash
npm install pg dotenv
npm install --save-dev @types/pg
```

### Alternative: Using Prisma ORM

```bash
npm install @prisma/client
npm install --save-dev prisma
npx prisma init
```

---

## 🗄️ Step 2: Setup PostgreSQL

### Install PostgreSQL

See `README.md` for installation instructions.

### Create Database

```sql
CREATE DATABASE justgogreen;
CREATE USER justgogreen_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE justgogreen TO justgogreen_user;
```

### Run Schema

```bash
psql -U justgogreen_user -d justgogreen -f schema.sql
```

---

## 📤 Step 3: Export Data from localStorage

### Create Export Script

Create `export-localstorage.ts`:

```typescript
// Run this in browser console or as a script

function exportLocalStorageData() {
  const data = {
    users: JSON.parse(localStorage.getItem('users') || '[]'),
    communities: JSON.parse(localStorage.getItem('communities') || '[]'),
    events: JSON.parse(localStorage.getItem('events') || '[]'),
    trainingModules: JSON.parse(localStorage.getItem('mentorModules') || '[]'),
    donations: JSON.parse(localStorage.getItem('donations') || '[]'),
    donationProjects: JSON.parse(localStorage.getItem('donationProjects') || '[]'),
    communityNeeds: JSON.parse(localStorage.getItem('communityNeeds') || '[]'),
    mentorSessions: JSON.parse(localStorage.getItem('mentorSessions') || '[]'),
    mentees: JSON.parse(localStorage.getItem('mentees') || '[]'),
    questions: JSON.parse(localStorage.getItem('mentorQuestions') || '[]'),
    rewards: JSON.parse(localStorage.getItem('rewards') || '[]'),
    achievements: JSON.parse(localStorage.getItem('achievements') || '[]')
  };

  // Download as JSON
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'justgogreen-export.json';
  a.click();
}

exportLocalStorageData();
```

---

## 🔄 Step 4: Transform and Import Data

### Create Import Script

Create `import-to-postgres.ts`:

```typescript
import { pool } from './connection-config';
import * as fs from 'fs';

async function importData() {
  const data = JSON.parse(fs.readFileSync('justgogreen-export.json', 'utf8'));

  try {
    // Import Users
    console.log('Importing users...');
    for (const user of data.users) {
      await pool.query(
        `INSERT INTO users (id, email, password_hash, first_name, last_name, role, xp, green_points, level, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (email) DO NOTHING`,
        [
          user.id,
          user.email,
          user.password, // Should be hashed
          user.firstName,
          user.lastName,
          user.role,
          user.xp || 0,
          user.greenPoints || 0,
          user.level || 1,
          user.createdAt || new Date()
        ]
      );
    }

    // Import Communities
    console.log('Importing communities...');
    for (const community of data.communities) {
      await pool.query(
        `INSERT INTO communities (id, name, description, organizer_id, location, category, member_count, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO NOTHING`,
        [
          community.id,
          community.name,
          community.description,
          community.organizerId,
          community.location,
          community.category,
          community.memberCount || 0,
          community.createdAt || new Date()
        ]
      );
    }

    // Import Training Modules
    console.log('Importing training modules...');
    for (const module of data.trainingModules) {
      await pool.query(
        `INSERT INTO training_modules (id, title, description, mentor_id, mentor_name, expertise_area, level, duration, enrolled_count, rating, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         ON CONFLICT (id) DO NOTHING`,
        [
          module.id,
          module.title,
          module.description,
          module.mentorId,
          module.mentorName,
          module.expertiseArea,
          module.level,
          module.duration,
          module.enrolledCount || 0,
          module.rating || 0,
          module.status,
          module.createdDate || new Date()
        ]
      );

      // Import topics
      if (module.topics && module.topics.length > 0) {
        for (const topic of module.topics) {
          await pool.query(
            `INSERT INTO training_topics (module_id, topic)
             VALUES ($1, $2)`,
            [module.id, topic]
          );
        }
      }

      // Import resources
      if (module.resources && module.resources.length > 0) {
        for (const resource of module.resources) {
          await pool.query(
            `INSERT INTO training_resources (module_id, type, title, url, description)
             VALUES ($1, $2, $3, $4, $5)`,
            [module.id, resource.type, resource.title, resource.url, resource.description]
          );
        }
      }
    }

    // Import Donation Projects
    console.log('Importing donation projects...');
    for (const project of data.donationProjects) {
      await pool.query(
        `INSERT INTO donation_projects (id, title, description, category, organizer_id, organizer_name, location, target_amount, current_amount, donor_count, status, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         ON CONFLICT (id) DO NOTHING`,
        [
          project.id,
          project.title,
          project.description,
          project.category,
          project.organizerId,
          project.organizerName,
          project.location,
          project.targetAmount,
          project.currentAmount || 0,
          project.donorCount || 0,
          project.status,
          project.startDate || new Date()
        ]
      );
    }

    // Import Donations
    console.log('Importing donations...');
    for (const donation of data.donations) {
      await pool.query(
        `INSERT INTO donations (id, project_id, donor_id, donor_name, amount, payment_method, status, donated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (id) DO NOTHING`,
        [
          donation.id,
          donation.projectId,
          donation.donorId,
          donation.donorName,
          donation.amount,
          donation.paymentMethod,
          donation.status,
          donation.date || new Date()
        ]
      );
    }

    console.log('✅ Data import completed successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error);
    throw error;
  }
}

importData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Run Import

```bash
ts-node import-to-postgres.ts
```

---

## 🔌 Step 5: Update Angular Services

### Update AuthService

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, userData);
  }

  getCurrentUser(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/me`);
  }
}
```

### Update MentorService

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getModulesByMentor(mentorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/modules/mentor/${mentorId}`);
  }

  createModule(moduleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/modules`, moduleData);
  }

  updateModule(id: string, updates: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/modules/${id}`, updates);
  }

  deleteModule(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/modules/${id}`);
  }
}
```

### Update DonationService

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getActiveProjects(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/projects/active`);
  }

  createDonation(donationData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/donations`, donationData);
  }

  getDonationsByDonor(donorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/donations/donor/${donorId}`);
  }

  getDonorImpact(donorId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/donations/impact/${donorId}`);
  }
}
```

---

## 🧪 Step 6: Testing

### Test Database Connection

```typescript
import { testConnection } from './database/connection-config';

testConnection().then(success => {
  if (success) {
    console.log('✅ Database connection successful');
  } else {
    console.log('❌ Database connection failed');
  }
});
```

### Test Queries

```typescript
import db from './database/connection-config';

async function testQueries() {
  // Test user query
  const user = await db.getUserByEmail('member@justgogreen.com');
  console.log('User:', user);

  // Test communities
  const communities = await db.getCommunities(5, 0);
  console.log('Communities:', communities);

  // Test modules
  const modules = await db.getModulesByMentor('mentor-id');
  console.log('Modules:', modules);
}

testQueries();
```

---

## 🚀 Step 7: Deploy

### Production Checklist

- [ ] Use environment variables for credentials
- [ ] Enable SSL for database connections
- [ ] Set up connection pooling
- [ ] Configure backup strategy
- [ ] Set up monitoring
- [ ] Enable query logging
- [ ] Configure rate limiting
- [ ] Set up error tracking

### Environment Variables

```env
# Production
DB_HOST=your-production-host
DB_PORT=5432
DB_NAME=justgogreen_prod
DB_USER=justgogreen_prod_user
DB_PASSWORD=strong_production_password
DB_SSL=true
NODE_ENV=production
```

---

## 🔄 Rollback Plan

If migration fails:

1. **Keep localStorage as backup**
   ```typescript
   // Don't clear localStorage immediately
   // Keep it for 30 days after successful migration
   ```

2. **Database backup**
   ```bash
   pg_dump -U justgogreen_user justgogreen > pre_migration_backup.sql
   ```

3. **Restore if needed**
   ```bash
   psql -U justgogreen_user justgogreen < pre_migration_backup.sql
   ```

---

## 📊 Migration Checklist

- [ ] PostgreSQL installed and running
- [ ] Database and user created
- [ ] Schema applied
- [ ] Data exported from localStorage
- [ ] Data transformed and imported
- [ ] Services updated to use HTTP
- [ ] Backend API created
- [ ] Connection tested
- [ ] Queries tested
- [ ] Authentication working
- [ ] All features tested
- [ ] Performance verified
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Documentation updated

---

## 🆘 Troubleshooting

### Connection Refused
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check port
sudo netstat -plnt | grep 5432
```

### Permission Denied
```sql
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO justgogreen_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO justgogreen_user;
```

### Data Type Mismatch
```sql
-- Check column types
\d+ table_name

-- Cast if needed
SELECT CAST(column AS type) FROM table;
```

---

## 📚 Additional Resources

- [PostgreSQL Migration Guide](https://www.postgresql.org/docs/current/migration.html)
- [Node.js PostgreSQL Tutorial](https://node-postgres.com/)
- [Angular HTTP Client](https://angular.io/guide/http)

---

**Migration Version:** 1.0.0  
**Last Updated:** November 17, 2025  
**Status:** ✅ Ready for Use
