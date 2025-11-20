# Test Users Quick Reference

## Login Credentials

### 👤 Member - Sarah Green
```
Email:    member@justgogreen.com
Password: member123
Role:     Member
Access:   /dashboard
```
**Features:** Join communities, enroll in trainings, attend events, redeem rewards

---

### 🏢 Organizer - James Community
```
Email:    organizer@justgogreen.com
Password: organizer123
Role:     Community Organizer
Access:   /organizer
```
**Features:** Create & manage communities, organize events, moderate content + all member features

---

### 🎓 Mentor - Dr. Maria Educator
```
Email:    mentor@justgogreen.com
Password: mentor123
Role:     Mentor
Access:   /mentor
```
**Features:** Create trainings, mentor users, track progress + all member features

---

### 💰 Donor - David Philanthropist
```
Email:    donor@justgogreen.com
Password: donor123
Role:     Donor
Access:   /donor
```
**Features:** Fund projects, view impact, donation reports + all member features

---

### ⚙️ Admin - Admin System
```
Email:    admin@justgogreen.com
Password: admin123
Role:     Administrator
Access:   /admin
```
**Features:** Full platform access, user management, system settings + all features

---

## Quick Test Flow

### Test Member Flow
1. Login as `member@justgogreen.com` / `member123`
2. Redirected to `/dashboard`
3. Explore: Communities, Trainings, Events, Rewards
4. Join a community, enroll in training
5. Check profile and XP progress

### Test Organizer Flow
1. Login as `organizer@justgogreen.com` / `organizer123`
2. Redirected to `/organizer`
3. View managed communities statistics
4. Click "Create Community"
5. Fill form and create new community
6. View community in dashboard

### Test Mentor Flow
1. Login as `mentor@justgogreen.com` / `mentor123`
2. Redirected to `/mentor`
3. View mentor dashboard (placeholder)
4. Access member features

### Test Donor Flow
1. Login as `donor@justgogreen.com` / `donor123`
2. Redirected to `/donor`
3. View donor dashboard (placeholder)
4. Access member features

### Test Admin Flow
1. Login as `admin@justgogreen.com` / `admin123`
2. Redirected to `/admin`
3. View admin dashboard (placeholder)
4. Access all features

---

## Role Comparison

| Feature | Member | Organizer | Mentor | Donor | Admin |
|---------|:------:|:---------:|:------:|:-----:|:-----:|
| Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| Communities | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Community | ❌ | ✅ | ❌ | ❌ | ✅ |
| Trainings | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Training | ❌ | ❌ | ✅ | ❌ | ✅ |
| Events | ✅ | ✅ | ✅ | ✅ | ✅ |
| Organize Event | ❌ | ✅ | ❌ | ❌ | ✅ |
| Rewards | ✅ | ✅ | ✅ | ✅ | ✅ |
| Donations | ✅ | ✅ | ✅ | ✅ | ✅ |
| View Impact | ❌ | ❌ | ❌ | ✅ | ✅ |
| Mentoring | ❌ | ❌ | ✅ | ❌ | ✅ |
| Moderation | ❌ | ✅* | ❌ | ❌ | ✅ |
| User Management | ❌ | ❌ | ❌ | ❌ | ✅ |

*Organizers can only moderate their own communities

---

## Testing Checklist

### Authentication
- [ ] Login with each role
- [ ] Verify correct dashboard redirect
- [ ] Check role badge displays correctly
- [ ] Logout and login as different role

### Member Features
- [ ] View dashboard
- [ ] Join community
- [ ] Enroll in training
- [ ] Join event
- [ ] Redeem reward
- [ ] View profile

### Organizer Features
- [ ] View organizer dashboard
- [ ] See community statistics
- [ ] Create new community
- [ ] View managed communities
- [ ] Access member features

### Cross-Role Testing
- [ ] Switch between roles
- [ ] Verify feature access
- [ ] Check UI differences
- [ ] Test navigation

---

## Notes

- All test users start with 850 green points
- All test users start at Level 1 (Rookie)
- Passwords are simple for testing (use strong passwords in production)
- Test users are stored in-memory (reset on page refresh)
- Role-based redirect happens automatically on login
