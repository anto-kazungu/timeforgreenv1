# Community Organizer Flow

## Overview
Community Organizers can create and manage communities, post content, and engage with members. They have access to all member features plus additional management capabilities.

## Features

### 1. Organizer Dashboard (`/organizer`)
**Components:** `organizer-dashboard.component.*`

#### Features:
- **Profile Section:** Shows organizer name, level, and role badge
- **Green Points Display:** Shows current points balance
- **Statistics Cards:**
  - Communities managed
  - Total members across all communities
  - Total posts
  - Active events

#### Quick Actions:
- Create Community
- Manage Communities
- View Posts
- My Profile

#### Communities Grid:
- Displays all communities managed by the organizer
- Shows community name, description, member count, post count, and access code
- Click to manage individual community

### 2. Create Community (`/organizer/create-community`)
**Components:** `create-community.component.*`

#### Form Fields:
- **Community Name:** Required text input
- **Description:** Required textarea for mission and goals
- **Category:** Select from predefined categories
  - Environmental Action (eco)
  - Education & Awareness (school)
  - Recycling & Waste (recycling)
  - Conservation (park)
  - Climate Action (thermostat)
  - Community Building (groups)
- **Color Theme:** Visual gradient selector (6 options)
- **Community Code:** Auto-generated 6-character code
- **Privacy:** Checkbox for private communities

#### Features:
- Live preview of community card
- Auto-generate unique community codes
- Visual gradient selector
- Category selection with icons
- Form validation

### 3. Community Management (Planned)
**Route:** `/organizer/manage/:id`

#### Capabilities:
- View community details
- Edit community information
- Manage members (approve/remove)
- Create posts
- Moderate comments
- View analytics

### 4. Community Posts (Planned)
**Route:** `/organizer/posts`

#### Features:
- View all posts across managed communities
- Create new posts
- Edit/delete own posts
- Moderate member posts
- Pin important posts

## User Flow

### Initial Login
```
1. Organizer logs in
2. Redirected to /organizer dashboard
3. Sees overview of all managed communities
4. Can access quick actions
```

### Creating a Community
```
1. Click "Create Community" from dashboard
2. Fill in community details
3. Select category and color theme
4. Generate community code
5. Preview community card
6. Submit to create
7. Redirected back to dashboard
8. New community appears in grid
```

### Managing Communities
```
1. Click on community card from dashboard
2. View community management interface
3. Create posts for members
4. Moderate content
5. View member list
6. Manage settings
```

### Posting Content
```
1. Navigate to community management
2. Create new post
3. Post appears in community feed
4. Members can see and interact with post
5. Organizer can moderate comments
```

## Design System Integration

### Colors
- **Primary:** Green monochromatic palette
- **Role Badge:** Green-700 (#32946e)
- **Icons:** Material Symbols Outlined
- **Font:** Poppins

### Components
- **Cards:** White background, rounded corners, shadows
- **Buttons:** Green gradient with hover effects
- **Forms:** Clean inputs with green focus states
- **Stats:** Icon + value + label layout

### Icons Used
| Feature | Icon | Purpose |
|---------|------|---------|
| Communities | `groups` | Community management |
| Members | `people` | Member count |
| Posts | `article` | Content |
| Events | `event` | Event management |
| Create | `add_circle` | Create actions |
| Settings | `settings` | Management |
| Key | `key` | Access codes |
| Category | `category` | Classification |
| Palette | `palette` | Theme selection |
| Back | `arrow_back` | Navigation |

## Routes

### Organizer Routes
```typescript
{ path: 'organizer', component: OrganizerDashboardComponent }
{ path: 'organizer/create-community', component: CreateCommunityComponent }
{ path: 'organizer/manage/:id', component: ManageCommunitiesComponent } // Planned
{ path: 'organizer/posts', component: CommunityPostsComponent } // Planned
```

### Shared Routes (Organizers have access)
- `/profile-settings` - Edit profile
- `/trainings` - View trainings
- `/rewards` - Redeem rewards
- `/events` - View events
- `/community` - View all communities (as member)

## Permissions

### Organizer Can:
- ✅ Create new communities
- ✅ Manage own communities
- ✅ Create posts in managed communities
- ✅ Moderate comments in managed communities
- ✅ View member lists
- ✅ Edit community details
- ✅ Generate access codes
- ✅ Access all member features
- ✅ Earn XP and Green Points

### Organizer Cannot:
- ❌ Delete other organizers' communities
- ❌ Access admin functions
- ❌ Modify platform settings
- ❌ Ban users globally

## Data Flow

### Community Creation
```typescript
1. Organizer fills form
2. Generate unique code
3. Create community object:
   {
     id: timestamp,
     name: string,
     description: string,
     code: string,
     members: 1,
     gradient: string,
     category: string,
     isPrivate: boolean,
     feeds: []
   }
4. Save to service/database
5. Show success notification
6. Redirect to dashboard
```

### Post Creation (Planned)
```typescript
1. Organizer creates post
2. Post object:
   {
     id: timestamp,
     communityId: string,
     author: string,
     content: string,
     timestamp: Date,
     likes: 0,
     comments: []
   }
3. Add to community feeds
4. Notify members
5. Show in community feed
```

## Future Enhancements

### Phase 1 (Current)
- [x] Organizer dashboard
- [x] Create community
- [x] View managed communities
- [x] Statistics display

### Phase 2 (Next)
- [ ] Community management interface
- [ ] Create/edit posts
- [ ] Member management
- [ ] Community analytics

### Phase 3 (Future)
- [ ] Event creation and management
- [ ] Member approval workflow
- [ ] Bulk actions
- [ ] Export reports
- [ ] Community templates
- [ ] Co-organizer roles
- [ ] Automated moderation
- [ ] Community insights dashboard

## Testing Checklist

- [ ] Dashboard loads correctly
- [ ] Statistics display accurate data
- [ ] Create community form validates inputs
- [ ] Code generation works
- [ ] Gradient selector functions
- [ ] Category selection works
- [ ] Preview updates in real-time
- [ ] Community creation succeeds
- [ ] Redirect after creation works
- [ ] New community appears in dashboard
- [ ] Mobile responsive
- [ ] Icons display correctly
- [ ] Notifications show properly

## Notes

- Organizers start with same XP/Points as members
- Communities are stored in CommunityService
- Posts are reflected to all community members
- Access codes are unique 6-character strings
- Private communities require approval (future feature)
- Organizers can be members of other communities
