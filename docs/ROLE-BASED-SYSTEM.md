# Role-Based Access Control System

## Overview
Time For Green implements a role-based access control (RBAC) system with five distinct user roles, each with specific permissions and access to different features.

## User Roles

### 1. Member (Default Role)
**Role ID:** `member`
**Dashboard:** `/dashboard`

#### Access & Permissions:
- ✅ View and join communities
- ✅ Participate in events
- ✅ Enroll in trainings
- ✅ Earn and redeem green points
- ✅ Create posts and comments
- ✅ Like and share content
- ✅ View trending topics
- ✅ Redeem rewards
- ✅ Track personal progress
- ❌ Create communities
- ❌ Manage other users
- ❌ Access admin features

#### Features:
- Personal dashboard with activity feed
- Community participation
- Training enrollment
- Event registration
- Rewards redemption
- Profile management
- XP and level progression

### 2. Community Organizer
**Role ID:** `organizer`
**Dashboard:** `/organizer`

#### Access & Permissions:
- ✅ All member permissions
- ✅ Create new communities
- ✅ Manage own communities
- ✅ Create posts in managed communities
- ✅ Moderate comments in managed communities
- ✅ View community analytics
- ✅ Generate community access codes
- ✅ Manage community members
- ❌ Delete other organizers' communities
- ❌ Access admin features

#### Features:
- Organizer dashboard with statistics
- Community creation interface
- Member management tools
- Post creation and moderation
- Community analytics
- Access code generation
- Event organization (planned)

### 3. Mentor
**Role ID:** `mentor`
**Dashboard:** `/mentor`

#### Access & Permissions:
- ✅ All member permissions
- ✅ Create training content
- ✅ Manage training modules
- ✅ Track mentee progress
- ✅ Provide guidance and feedback
- ✅ Host educational sessions
- ✅ Create learning resources
- ❌ Manage communities
- ❌ Access admin features

#### Features (Planned):
- Mentor dashboard
- Training content creation
- Mentee management
- Progress tracking
- Resource library
- Session scheduling
- Certification management

### 4. Donor
**Role ID:** `donor`
**Dashboard:** `/donor`

#### Access & Permissions:
- ✅ All member permissions
- ✅ View donation impact
- ✅ Track funded projects
- ✅ Receive donation reports
- ✅ Support specific initiatives
- ✅ View community needs
- ❌ Manage communities
- ❌ Access admin features

#### Features (Planned):
- Donor dashboard
- Impact visualization
- Project funding interface
- Donation history
- Tax receipts
- Impact reports
- Community needs board

### 5. Admin
**Role ID:** `admin`
**Dashboard:** `/admin`

#### Access & Permissions:
- ✅ All permissions from all roles
- ✅ Manage all users
- ✅ Manage all communities
- ✅ Platform configuration
- ✅ View system analytics
- ✅ Moderate all content
- ✅ Manage rewards catalog
- ✅ System settings

#### Features (Planned):
- Admin dashboard
- User management
- Content moderation
- System analytics
- Platform configuration
- Rewards management
- Report generation

## Test Users

### Test Credentials

| Role | Email | Password | Name | Username |
|------|-------|----------|------|----------|
| Member | member@justgogreen.com | member123 | Sarah Green | member |
| Organizer | organizer@justgogreen.com | organizer123 | James Community | organizer |
| Mentor | mentor@justgogreen.com | mentor123 | Dr. Maria Educator | mentor |
| Donor | donor@justgogreen.com | donor123 | David Philanthropist | donor |
| Admin | admin@justgogreen.com | admin123 | Admin System | admin |

### User Profiles

#### Member - Sarah Green
```typescript
{
  username: 'member',
  email: 'member@justgogreen.com',
  password: 'member123',
  firstName: 'Sarah',
  lastName: 'Green',
  role: 'member',
  bio: 'Passionate about environmental conservation and sustainable living.'
}
```

#### Organizer - James Community
```typescript
{
  username: 'organizer',
  email: 'organizer@justgogreen.com',
  password: 'organizer123',
  firstName: 'James',
  lastName: 'Community',
  role: 'organizer',
  bio: 'Community organizer dedicated to bringing people together for environmental action.'
}
```

#### Mentor - Dr. Maria Educator
```typescript
{
  username: 'mentor',
  email: 'mentor@justgogreen.com',
  password: 'mentor123',
  firstName: 'Dr. Maria',
  lastName: 'Educator',
  role: 'mentor',
  bio: 'Environmental scientist and educator with 15 years of experience in sustainability.'
}
```

#### Donor - David Philanthropist
```typescript
{
  username: 'donor',
  email: 'donor@justgogreen.com',
  password: 'donor123',
  firstName: 'David',
  lastName: 'Philanthropist',
  role: 'donor',
  bio: 'Supporting environmental initiatives through funding and resources.'
}
```

#### Admin - Admin System
```typescript
{
  username: 'admin',
  email: 'admin@justgogreen.com',
  password: 'admin123',
  firstName: 'Admin',
  lastName: 'System',
  role: 'admin',
  bio: 'Platform administrator managing the Just Go Green ecosystem.'
}
```

## Authentication Flow

### Login Process
```typescript
1. User enters email/username and password
2. AuthService validates credentials
3. If valid:
   - Set currentUser
   - Store in localStorage
   - Redirect based on role:
     - member → /dashboard
     - organizer → /organizer
     - mentor → /mentor
     - donor → /donor
     - admin → /admin
4. If invalid:
   - Show error message
   - Keep on login page
```

### Role-Based Redirect
```typescript
private redirectByRole(role: UserRole): void {
  switch (role) {
    case 'member':
      this.router.navigate(['/dashboard']);
      break;
    case 'organizer':
      this.router.navigate(['/organizer']);
      break;
    case 'mentor':
      this.router.navigate(['/mentor']);
      break;
    case 'donor':
      this.router.navigate(['/donor']);
      break;
    case 'admin':
      this.router.navigate(['/admin']);
      break;
  }
}
```

## Route Protection

### Auth Guard
All role-specific routes are protected by `authGuard`:
```typescript
{ path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] }
{ path: 'organizer', component: OrganizerDashboardComponent, canActivate: [authGuard] }
{ path: 'mentor', component: MentorDashboardComponent, canActivate: [authGuard] }
{ path: 'donor', component: DonorDashboardComponent, canActivate: [authGuard] }
{ path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] }
```

### Role Verification Methods
```typescript
// Get current user's role
getUserRole(): UserRole | null

// Check if user has specific role
hasRole(role: UserRole): boolean

// Check if user can access route
canAccessRoute(requiredRole: UserRole): boolean
```

## Feature Matrix

| Feature | Member | Organizer | Mentor | Donor | Admin |
|---------|--------|-----------|--------|-------|-------|
| Join Communities | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Communities | ❌ | ✅ | ❌ | ❌ | ✅ |
| Manage Communities | ❌ | ✅ (own) | ❌ | ❌ | ✅ (all) |
| Enroll in Trainings | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Trainings | ❌ | ❌ | ✅ | ❌ | ✅ |
| Join Events | ✅ | ✅ | ✅ | ✅ | ✅ |
| Organize Events | ❌ | ✅ | ❌ | ❌ | ✅ |
| Redeem Rewards | ✅ | ✅ | ✅ | ✅ | ✅ |
| Manage Rewards | ❌ | ❌ | ❌ | ❌ | ✅ |
| Make Donations | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Donation Impact | ❌ | ❌ | ❌ | ✅ | ✅ |
| Mentor Users | ❌ | ❌ | ✅ | ❌ | ✅ |
| Moderate Content | ❌ | ✅ (own) | ❌ | ❌ | ✅ (all) |
| View Analytics | ❌ | ✅ (own) | ✅ (own) | ✅ (own) | ✅ (all) |
| Manage Users | ❌ | ❌ | ❌ | ❌ | ✅ |
| System Settings | ❌ | ❌ | ❌ | ❌ | ✅ |

## Implementation Status

### Completed ✅
- [x] Role-based authentication
- [x] Test users for all roles
- [x] Role-based redirect on login
- [x] Member dashboard
- [x] Organizer dashboard
- [x] Create community feature
- [x] Role display in UI

### In Progress 🚧
- [ ] Mentor dashboard
- [ ] Donor dashboard
- [ ] Admin dashboard

### Planned 📋
- [ ] Role-specific guards
- [ ] Permission-based UI rendering
- [ ] Role upgrade system
- [ ] Multi-role support
- [ ] Role-based notifications

## Usage Examples

### Checking User Role
```typescript
// In component
const role = this.authService.getUserRole();
if (role === 'organizer') {
  // Show organizer-specific features
}
```

### Conditional Rendering
```html
<!-- Show only for organizers -->
<div *ngIf="authService.hasRole('organizer')">
  <button (click)="createCommunity()">Create Community</button>
</div>
```

### Route Access
```typescript
// Check if user can access route
if (this.authService.canAccessRoute('admin')) {
  this.router.navigate(['/admin']);
}
```

## Security Considerations

1. **Client-Side Only:** Current implementation is client-side only (prototype)
2. **Production Requirements:**
   - Server-side authentication
   - JWT tokens
   - Role verification on backend
   - Encrypted passwords
   - Session management
   - HTTPS only

3. **Best Practices:**
   - Never trust client-side role checks
   - Always verify on server
   - Use secure password hashing
   - Implement rate limiting
   - Log authentication attempts

## Testing

### Test Scenarios

1. **Member Login:**
   - Login as member@justgogreen.com
   - Verify redirect to /dashboard
   - Check member features available

2. **Organizer Login:**
   - Login as organizer@justgogreen.com
   - Verify redirect to /organizer
   - Check community creation available

3. **Role Switching:**
   - Logout
   - Login as different role
   - Verify correct dashboard loads

4. **Unauthorized Access:**
   - Try accessing /organizer as member
   - Verify redirect or access denied

## Future Enhancements

- [ ] Role hierarchy (admin > organizer > member)
- [ ] Custom permissions per role
- [ ] Role-based email notifications
- [ ] Role badges and indicators
- [ ] Role-specific onboarding
- [ ] Role upgrade requests
- [ ] Multi-role support (user can have multiple roles)
- [ ] Temporary role assignments
- [ ] Role-based analytics
- [ ] Role management UI for admins
