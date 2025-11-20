# Just Go Green - Documentation

Welcome to the Time For Green documentation! This folder contains all technical documentation, implementation guides, and system architecture details.

---

## 📚 Table of Contents

### System Architecture
- [Role-Based System](./ROLE-BASED-SYSTEM.md) - Complete guide to user roles and permissions
- [Leveling System](./LEVELING-SYSTEM.md) - XP progression and level mechanics
- [XP vs Green Points](./XP-VS-GREEN-POINTS.md) - Understanding the dual reward system
- [Component Structure](./COMPONENT-STRUCTURE.md) - Application component organization

### Implementation Guides

#### Donor Components
- [Donor Components Complete](./DONOR-COMPONENTS-COMPLETE.md) - Full donor system implementation
  - Browse Projects
  - Donation History
  - Impact Report
  - Community Needs

#### Mentor Components
- [Mentor Components Implementation](./MENTOR-COMPONENTS-IMPLEMENTATION.md) - Initial mentor setup
- [Mentor Components Complete](./MENTOR-COMPONENTS-COMPLETE.md) - Complete mentor system
  - Create Training
  - Manage Modules
  - View Mentees
  - Schedule Sessions

#### UI/UX Improvements
- [Dialog Boxes Implementation](./DIALOG-BOXES-IMPLEMENTATION.md) - Professional dialog system
- [Mentor Dashboard Fix](./MENTOR-DASHBOARD-FIX.md) - Service integration fix

---

## 🎯 Quick Start

### For Developers
1. Read [Component Structure](./COMPONENT-STRUCTURE.md) to understand the app organization
2. Review [Role-Based System](./ROLE-BASED-SYSTEM.md) to understand user types
3. Check specific implementation guides for the feature you're working on

### For Testers
1. Review [Role-Based System](./ROLE-BASED-SYSTEM.md) for test accounts
2. Check implementation guides for testing instructions
3. Use the credentials provided in each guide

---

## 🔑 Test Accounts

### Member (Regular User)
- Email: `member@justgogreen.com`
- Password: `member123`

### Donor
- Email: `donor@justgogreen.com`
- Password: `donor123`

### Mentor
- Email: `mentor@justgogreen.com`
- Password: `mentor123`

### Organizer
- Email: `organizer@justgogreen.com`
- Password: `organizer123`

### Admin
- Email: `admin@justgogreen.com`
- Password: `admin123`

---

## 📖 Documentation Overview

### System Architecture Documents

#### Role-Based System
Comprehensive guide covering:
- 5 user roles (Member, Donor, Mentor, Organizer, Admin)
- Role-specific features and permissions
- Dashboard layouts for each role
- Navigation flows

#### Leveling System
Details about:
- 10 levels from Seedling to Legend
- XP requirements per level
- Level-specific perks and badges
- Progression mechanics

#### XP vs Green Points
Explains the dual reward system:
- **XP (Experience Points)** - For leveling up
- **Green Points** - For rewards and marketplace
- How to earn each type
- What they're used for

#### Component Structure
Application architecture:
- Shared components
- Role-specific components
- Services and guards
- Routing structure

---

### Implementation Guides

#### Donor System
Complete implementation of donor features:
- **Browse Projects** - View and donate to environmental projects
- **Donation History** - Track all past donations
- **Impact Report** - See environmental impact metrics
- **Community Needs** - Fund urgent community requests
- Professional donation dialogs
- Receipt downloads
- Impact tracking

#### Mentor System
Full mentor platform for environmental experts:
- **Create Training** - Build educational modules
- **Manage Modules** - Edit, publish, archive modules
- **View Mentees** - Track student progress
- **Schedule Sessions** - Live Q&A consultations
- 8 expertise areas (Environmental Law, Forestry, Climate Science, etc.)
- Question/Answer system
- Resource management

#### Dialog System
Professional UI improvements:
- Material Design dialogs
- Donation input dialogs
- Confirmation dialogs
- Alert dialogs
- No more browser alerts/prompts

---

## 🛠️ Technical Stack

### Frontend
- **Framework:** Angular 18
- **UI Library:** Material Design
- **Styling:** Custom CSS with gradients
- **Icons:** Material Icons
- **State Management:** Services with RxJS

### Data Storage
- **Local Storage** - For demo/development
- **Services** - Centralized data management
- **Guards** - Route protection

### Key Services
- `AuthService` - Authentication and user management
- `MentorService` - Mentor-specific operations
- `DonationService` - Donation and project management
- `PointsService` - Green Points management
- `XPService` - Experience and leveling
- `DialogService` - Dialog management

---

## 🎨 Design System

### Color Palette
- **Primary Gradient:** #667eea → #764ba2 (Purple)
- **Success:** #4caf50 (Green)
- **Warning:** #ff9800 (Orange)
- **Error:** #f44336 (Red)
- **Info:** #2196f3 (Blue)

### Typography
- **Headings:** Bold, 24-32px
- **Body:** Regular, 14-16px
- **Small Text:** 12-13px

### Components
- Card-based layouts
- Gradient buttons
- Material Icons
- Progress bars
- Status badges
- Empty states

---

## 📊 Features by Role

### Member Features
- Join communities
- Participate in events
- Complete training modules
- Earn XP and Green Points
- Track environmental impact
- Redeem rewards

### Donor Features
- Browse environmental projects
- Make donations
- View donation history
- Track impact metrics
- Fund community needs
- Download receipts

### Mentor Features
- Create training modules
- Manage educational content
- Track mentee progress
- Answer questions
- Schedule live sessions
- Share expertise in 8 areas

### Organizer Features
- Create communities
- Manage members
- Post updates
- Organize events
- Track community impact

### Admin Features
- User management
- System configuration
- Analytics dashboard
- Content moderation

---

## 🚀 Recent Updates

### Latest Implementations
1. ✅ Complete donor system with 4 components
2. ✅ Complete mentor system with 4 components
3. ✅ Professional dialog boxes (no alerts)
4. ✅ Mentor dashboard service integration
5. ✅ Resource management for training modules
6. ✅ Session scheduling system
7. ✅ Question/Answer system

### Bug Fixes
1. ✅ Mentor dashboard now reflects new modules
2. ✅ Service consistency across components
3. ✅ Template property alignment
4. ✅ Navigation flows corrected

---

## 📝 Contributing

When adding new features:
1. Create implementation documentation
2. Add to this README index
3. Include testing instructions
4. Provide test credentials if needed
5. Document any new services or interfaces

---

## 🔗 Related Resources

### External Documentation
- [Angular Documentation](https://angular.io/docs)
- [Material Design](https://material.io/design)
- [RxJS Documentation](https://rxjs.dev/)

### Project Files
- `package.json` - Dependencies
- `angular.json` - Angular configuration
- `tsconfig.json` - TypeScript configuration

---

## 📞 Support

For questions or issues:
1. Check the relevant implementation guide
2. Review the system architecture docs
3. Test with provided credentials
4. Check the component structure

---

## 📅 Version History

### v1.0.0 (Current)
- Complete role-based system
- Donor components fully functional
- Mentor components fully functional
- Professional dialog system
- Service integration complete

---

**Last Updated:** November 17, 2025

**Status:** ✅ All core features implemented and documented
