# API Integration Guide - Member Flow

## Overview
This guide shows how to integrate the PostgreSQL database with your backend API for the member flow.

## Technology Stack Options

### Option 1: Node.js + Express + Prisma (Recommended)
### Option 2: Node.js + Express + TypeORM
### Option 3: Python + FastAPI + SQLAlchemy

---

## Option 1: Node.js + Express + Prisma

### 1. Install Dependencies
```bash
npm install express prisma @prisma/client bcrypt jsonwebtoken dotenv cors helmet
npm install -D typescript @types/node @types/express ts-node nodemon
```

### 2. Initialize Prisma
```bash
npx prisma init
```

### 3. Update `prisma/schema.prisma`
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                UUID      @id @default(uuid())
  username          String    @unique @db.VarChar(50)
  email             String    @unique @db.VarChar(255)
  passwordHash      String    @map("password_hash") @db.VarChar(255)
  firstName         String    @map("first_name") @db.VarChar(100)
  lastName          String    @map("last_name") @db.VarChar(100)
  bio               String?
  role              String    @default("member") @db.VarChar(20)
  xp                Int       @default(0)
  level             Int       @default(1)
  greenPoints       Int       @map("green_points") @default(0)
  totalTreesPlanted Int       @map("total_trees_planted") @default(0)
  isActive          Boolean   @map("is_active") @default(true)
  isVerified        Boolean   @map("is_verified") @default(false)
  emailVerifiedAt   DateTime? @map("email_verified_at")
  lastLoginAt       DateTime? @map("last_login_at")
  createdAt         DateTime  @default(now()) @map("created_at")
  updatedAt         DateTime  @updatedAt @map("updated_at")
  deletedAt         DateTime? @map("deleted_at")

  // Relations
  treeLogs          TreeLog[]
  communityMembers  CommunityMember[]
  userTrainings     UserTraining[]
  eventParticipants EventParticipant[]
  userAchievements  UserAchievement[]
  userStats         UserStats?

  @@map("users")
}

// Add other models similarly...
```

### 4. Generate Prisma Client
```bash
npx prisma db pull  # Pull existing schema
npx prisma generate # Generate client
```

### 5. Sample API Endpoints

#### `src/routes/auth.routes.ts`
```typescript
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Register
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        firstName,
        lastName,
        role: 'member'
      }
    });
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        },
        token
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { username }
    });
    
    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });
    
    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
    
    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          xp: user.xp,
          level: user.level,
          greenPoints: user.greenPoints
        },
        token
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

export default router;
```

#### `src/routes/user.routes.ts`
```typescript
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      include: {
        userStats: true,
        userAchievements: {
          include: {
            achievement: true
          }
        }
      }
    });
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { firstName, lastName, bio } = req.body;
    
    const user = await prisma.user.update({
      where: { id: req.userId },
      data: { firstName, lastName, bio }
    });
    
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// Get user stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const stats = await prisma.userStats.findUnique({
      where: { userId: req.userId }
    });
    
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch stats' });
  }
});

export default router;
```

#### `src/routes/tree.routes.ts`
```typescript
import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Log tree planting
router.post('/log', authMiddleware, async (req, res) => {
  try {
    const { treeCode, treeCount, species, location, communityId } = req.body;
    
    const treeLog = await prisma.treeLog.create({
      data: {
        userId: req.userId,
        treeCode,
        treeCount,
        species,
        location,
        communityId,
        plantingDate: new Date()
      }
    });
    
    res.status(201).json({ success: true, data: treeLog });
  } catch (error) {
    res.status(400).json({ success: false, error: 'Failed to log trees' });
  }
});

// Get user's tree logs
router.get('/logs', authMiddleware, async (req, res) => {
  try {
    const logs = await prisma.treeLog.findMany({
      where: {
        userId: req.userId,
        deletedAt: null
      },
      orderBy: { createdAt: 'desc' },
      include: {
        community: {
          select: {
            name: true
          }
        }
      }
    });
    
    res.json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch logs' });
  }
});

// Search tree by code
router.get('/search/:code', authMiddleware, async (req, res) => {
  try {
    const log = await prisma.treeLog.findUnique({
      where: { treeCode: req.params.code },
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            username: true
          }
        },
        community: {
          select: {
            name: true
          }
        }
      }
    });
    
    if (!log) {
      return res.status(404).json({ success: false, error: 'Tree not found' });
    }
    
    res.json({ success: true, data: log });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

export default router;
```

#### `src/middleware/auth.ts`
```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  userId: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, error: 'No token provided' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};
```

#### `src/index.ts`
```typescript
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import treeRoutes from './routes/tree.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/trees', treeRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## API Endpoints Summary

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `POST /api/v1/auth/logout` - Logout user
- `POST /api/v1/auth/refresh` - Refresh token

### User Profile
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile
- `GET /api/v1/user/stats` - Get user statistics
- `GET /api/v1/user/achievements` - Get user achievements
- `GET /api/v1/user/level` - Get level information

### Tree Logging
- `POST /api/v1/trees/log` - Log tree planting
- `GET /api/v1/trees/logs` - Get user's tree logs
- `GET /api/v1/trees/search/:code` - Search tree by code
- `PUT /api/v1/trees/:id` - Update tree log
- `DELETE /api/v1/trees/:id` - Delete tree log

### Communities
- `GET /api/v1/communities` - List all communities
- `GET /api/v1/communities/:id` - Get community details
- `POST /api/v1/communities/:id/join` - Join community
- `POST /api/v1/communities/:id/leave` - Leave community
- `GET /api/v1/communities/:id/members` - Get community members

### Events
- `GET /api/v1/events` - List all events
- `GET /api/v1/events/:id` - Get event details
- `POST /api/v1/events/:id/register` - Register for event
- `POST /api/v1/events/:id/cancel` - Cancel registration
- `GET /api/v1/events/my-events` - Get user's events

### Trainings
- `GET /api/v1/trainings` - List all trainings
- `GET /api/v1/trainings/:id` - Get training details
- `POST /api/v1/trainings/:id/enroll` - Enroll in training
- `PUT /api/v1/trainings/:id/progress` - Update progress
- `POST /api/v1/trainings/:id/complete` - Mark as completed

---

## Testing the API

### Using cURL
```bash
# Register
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"password123"}'

# Get Profile (with token)
curl -X GET http://localhost:3000/api/v1/user/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Using Postman
1. Import the API collection
2. Set environment variables
3. Test each endpoint

---

## Next Steps
1. Implement remaining endpoints
2. Add input validation (use Joi or Zod)
3. Add error handling middleware
4. Implement rate limiting
5. Add API documentation (Swagger/OpenAPI)
6. Write unit and integration tests
7. Set up CI/CD pipeline
8. Deploy to production

## Resources
- [Prisma Documentation](https://www.prisma.io/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [JWT Best Practices](https://jwt.io/introduction)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
