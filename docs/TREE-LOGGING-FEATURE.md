# Tree Logging Feature Documentation

## Overview
The Tree Logging feature allows users across all roles (Members, Organizers, Mentors, and Donors) to log their tree planting activities and track their environmental impact.

## Implementation Summary

### 1. Shared Tree Logger Component
**Location:** `src/app/components/shared/tree-logger/`

A reusable component that provides:
- Form to log tree planting activities
- Display of planting history
- XP rewards (10 XP per tree)
- Real-time total trees counter

**Features:**
- Number of trees planted (required)
- Date of planting (required)
- Location (required)
- Tree species (optional)
- Notes (optional)
- Success/error messaging
- Data persistence in localStorage

### 2. Integration Across Profile Settings

#### User Profile Component (`user-profile.component`)
**Location:** `src/app/components/member/user-profile/`

The tree logger is integrated into the shared profile settings page that all roles use:
- Tree logging section available for all roles except admin
- Full tree planting history display
- Accessible via "Profile Settings" or "My Profile" from any dashboard

**Role Access:**
- ✅ Members - Full access
- ✅ Organizers - Full access (via profile settings)
- ✅ Mentors - Full access (via profile settings)
- ✅ Donors - Full access (via profile settings)
- ❌ Admins - Not available

### 3. Dashboard Stats Integration

While the tree logging form is in profile settings, the "Trees Planted" stat is displayed on all dashboards:

#### Organizer Dashboard
- "Trees Planted" stat card shows total count
- Loads data from localStorage on init
- Updates when user logs trees in profile

#### Mentor Dashboard
- "Trees Planted" stat card shows total count
- Loads data from localStorage on init
- Updates when user logs trees in profile

#### Donor Dashboard
- "Trees Planted" stat card shows total count
- Loads data from localStorage on init
- Updates when user logs trees in profile

### 4. XP Reward System
- **10 XP per tree planted**
- Automatic XP award when logging trees
- Reason tracked: "Planted X tree(s)"
- Integrated with existing XP service

### 5. Data Structure

**Tree Log Entry:**
```typescript
{
  id: number;              // Unique timestamp ID
  count: number;           // Number of trees planted
  date: string;            // Date of planting (ISO format)
  location: string;        // Location where trees were planted
  species: string | null;  // Tree species (optional)
  notes: string | null;    // Additional notes (optional)
  xpEarned: number;        // XP earned (count * 10)
  timestamp: string;       // Log creation timestamp
}
```

**Storage:** localStorage key `'treePlantingLogs'`

### 6. UI/UX Features

**Form Design:**
- Clean, modern glassmorphism design
- Green color scheme matching brand (#00d084)
- Responsive layout for mobile devices
- Input validation with error messages
- Success confirmation with auto-hide

**History Display:**
- Card-based layout
- Shows all logged activities
- Displays: tree count, date, location, species, notes, XP earned
- Empty state when no logs exist
- Hover effects and animations

**Stats Integration:**
- Real-time counter in dashboard stats
- Icon: `park` (tree icon)
- Color: `#00d084` (brand green)
- Updates immediately after logging

### 7. Component Communication
- Uses `@Output()` event emitter `treesLogged`
- Emits total trees count to parent components
- Parent components update their stats arrays

### 8. Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Stacked form layout on mobile
- Touch-friendly buttons and inputs

## Usage

### For Users:
1. Navigate to your dashboard
2. Click on "My Profile" or "Profile Settings"
3. Scroll to "Tree Planting Log" section
4. Click "Log Trees" button
5. Fill in the form:
   - Number of trees (required)
   - Date planted (required)
   - Location (required)
   - Species (optional)
   - Notes (optional)
6. Click "Log Trees" to submit
7. View your planting history below the form
8. Return to dashboard to see your total trees count in the stats section

### For Developers:
To add tree logger to a new component:

1. Import the component:
```typescript
import { TreeLoggerComponent } from '../../shared/tree-logger/tree-logger.component';
```

2. Add to imports array:
```typescript
@Component({
  imports: [CommonModule, TreeLoggerComponent]
})
```

3. Add property and method:
```typescript
totalTreesPlanted = 0;

onTreesLogged(total: number) {
  this.totalTreesPlanted = total;
  // Update your stats array
}
```

4. Add to template:
```html
<app-tree-logger (treesLogged)="onTreesLogged($event)"></app-tree-logger>
```

## Benefits

### Environmental Impact:
- Tracks individual contribution to reforestation
- Encourages tree planting activities
- Provides visibility of collective impact

### Gamification:
- XP rewards incentivize participation
- Progress tracking motivates continued engagement
- Achievements tied to tree planting milestones

### Community Building:
- Shared environmental goals
- Visible impact across all user roles
- Encourages friendly competition

## Future Enhancements

Potential improvements:
1. Photo upload for planted trees
2. GPS location integration
3. Tree survival tracking
4. Community tree planting events
5. Leaderboards for most trees planted
6. Certificates for milestones
7. Integration with real tree planting organizations
8. Carbon offset calculations
9. Tree species database with info
10. Social sharing of achievements

## Technical Notes

- All data stored in localStorage (client-side)
- No backend API calls required in current implementation
- XP service integration for rewards
- Standalone component for easy reusability
- TypeScript interfaces for type safety
- Angular reactive forms with two-way binding

## Testing

To test the feature:
1. Log in as any user role
2. Navigate to dashboard
3. Click "Log Trees"
4. Submit form with valid data
5. Verify:
   - Success message appears
   - XP is awarded
   - Total trees counter updates
   - Log appears in history
   - Data persists after page refresh

## Conclusion

The Tree Logging feature successfully integrates environmental impact tracking across all user roles, providing a unified way to log and celebrate tree planting activities while rewarding users with XP for their contributions.
