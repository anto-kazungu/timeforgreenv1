# Bug Fix: Organizer Navigation Issues

## Issue
Organizers accessing shared components (trainings, events, rewards, profile, etc.) were being redirected back to the member dashboard (`/dashboard`) instead of the organizer dashboard (`/organizer`) when clicking the back button.

## Root Cause
All shared components had hardcoded navigation to `/dashboard` in their `goBack()` methods, without considering the user's role.

## Solution

### 1. Added Helper Method to AuthService

Created a centralized method to get the correct dashboard route based on user role:

```typescript
getRoleDashboard(): string {
  const role = this.getUserRole();
  switch (role) {
    case 'organizer':
      return '/organizer';
    case 'mentor':
      return '/mentor';
    case 'donor':
      return '/donor';
    case 'admin':
      return '/admin';
    default:
      return '/dashboard';
  }
}
```

### 2. Updated All Components

Updated `goBack()` methods in all shared components to use the helper:

**Before:**
```typescript
goBack() {
  this.router.navigate(['/dashboard']); // ❌ Always goes to member dashboard
}
```

**After:**
```typescript
goBack() {
  this.router.navigate([this.authService.getRoleDashboard()]); // ✅ Role-aware
}
```

## Components Fixed

### Member Components (Shared with All Roles)
1. ✅ `user-profile.component.ts` - Profile settings
2. ✅ `trainings.component.ts` - Training enrollment
3. ✅ `events.component.ts` - Event participation
4. ✅ `rewards.component.ts` - Rewards redemption
5. ✅ `community.component.ts` - Community browsing
6. ✅ `trending-detail.component.ts` - Post details

### Organizer Components (Already Correct)
- ✅ `organizer-dashboard.component.ts` - Main dashboard
- ✅ `create-community.component.ts` - Community creation

## Navigation Flow Now

### Member Flow
```
Member Dashboard (/dashboard)
  ↓ Navigate to Profile
Profile Settings (/profile-settings)
  ↓ Click Back
Member Dashboard (/dashboard) ✅
```

### Organizer Flow
```
Organizer Dashboard (/organizer)
  ↓ Navigate to Profile
Profile Settings (/profile-settings)
  ↓ Click Back
Organizer Dashboard (/organizer) ✅
```

### Mentor Flow
```
Mentor Dashboard (/mentor)
  ↓ Navigate to Trainings
Trainings (/trainings)
  ↓ Click Back
Mentor Dashboard (/mentor) ✅
```

### Donor Flow
```
Donor Dashboard (/donor)
  ↓ Navigate to Events
Events (/events)
  ↓ Click Back
Donor Dashboard (/donor) ✅
```

### Admin Flow
```
Admin Dashboard (/admin)
  ↓ Navigate to Rewards
Rewards (/rewards)
  ↓ Click Back
Admin Dashboard (/admin) ✅
```

## Benefits

1. **Consistent Navigation:** All roles now have proper back navigation
2. **Single Source of Truth:** One method handles all role-based routing
3. **Maintainable:** Easy to add new roles or change routes
4. **User-Friendly:** Users stay within their role context
5. **Scalable:** Works for all current and future roles

## Testing

### Test Each Role
1. **Member:**
   - Login as member@justgogreen.com
   - Navigate to Profile, Trainings, Events, Rewards
   - Click Back button in each
   - Should return to `/dashboard`

2. **Organizer:**
   - Login as organizer@justgogreen.com
   - Navigate to Profile, Create Community, Trainings
   - Click Back button in each
   - Should return to `/organizer`

3. **Mentor:**
   - Login as mentor@justgogreen.com
   - Navigate to Profile, Trainings
   - Click Back button
   - Should return to `/mentor`

4. **Donor:**
   - Login as donor@justgogreen.com
   - Navigate to Profile, Events
   - Click Back button
   - Should return to `/donor`

5. **Admin:**
   - Login as admin@justgogreen.com
   - Navigate to any component
   - Click Back button
   - Should return to `/admin`

## Related Files

### Modified Files
- `src/app/services/auth.service.ts` - Added `getRoleDashboard()` method
- `src/app/components/member/user-profile/user-profile.component.ts`
- `src/app/components/member/trainings/trainings.component.ts`
- `src/app/components/member/events/events.component.ts`
- `src/app/components/member/rewards/rewards.component.ts`
- `src/app/components/member/community/community.component.ts`
- `src/app/components/member/trending-detail/trending-detail.component.ts`

### Unchanged Files (Already Correct)
- `src/app/components/organizers/organizer-dashboard/organizer-dashboard.component.ts`
- `src/app/components/organizers/create-community/create-community.component.ts`
- `src/app/components/member/community-detail/community-detail.component.ts` (goes to `/community`)

## Future Improvements

1. **Breadcrumb Navigation:** Add breadcrumb trail for complex navigation
2. **Browser Back Button:** Handle browser back button properly
3. **Navigation History:** Track user's navigation path
4. **Deep Linking:** Support direct links to specific pages
5. **Navigation Guards:** Prevent unauthorized role access

## Status
✅ **Fixed** - All back buttons now correctly navigate to the user's role-specific dashboard
