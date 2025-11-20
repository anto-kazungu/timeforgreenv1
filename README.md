# Time For Green

An environmental action platform connecting communities, donors, mentors, and organizers to create positive environmental impact.

---

## About

Time For Green is a comprehensive platform designed to empower environmental action through:
- **Community Building** - Connect with like-minded environmental activists
- **Education** - Learn from environmental experts across multiple fields
- **Funding** - Support environmental projects and community needs
- **Action** - Participate in events and initiatives
- **Impact Tracking** - Measure and celebrate environmental achievements

By reconnecting with our forests and environment, we ignite the change needed to protect and restore our ecosystems

---

## Key Features

### For Members
- Join environmental communities
- Complete training modules
- Participate in events
- Earn XP and level up (10 levels)
- Collect Green Points for rewards
- Track personal environmental impact
- Stay informed with latest climate news

### For Donors
- Browse and fund environmental projects
- View donation history with receipts
- Track environmental impact metrics
- Support urgent community needs
- See real-time project progress

### For Mentors
- Share expertise in environmental fields
- Create educational training modules
- Manage mentees and track progress
- Answer questions from students
- Schedule live consultation sessions
- Build resource libraries

### For Organizers
- Create and manage communities
- Post updates and announcements
- Organize environmental events
- Track community impact
- Engage members

### For Admins
- User management
- System configuration
- Analytics and reporting
- Content moderation

---

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Angular CLI

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd timeforgreenv1

# Install dependencies
npm install

# Configure environment variables (Important!)
# Copy environment template and add your API keys
cp src/environments/environment.template.ts src/environments/environment.ts
# Edit environment.ts and add your News API key

# Start development server
ng serve

# Open browser to
http://localhost:4200
```

**Note:** You need to configure the News API key before the Climate News feature will work. See [Environment Setup Guide](./docs/ENVIRONMENT-SETUP.md) for details.

### Build for Production

```bash
ng build --configuration production
```

---

## Test Accounts

| Role | Email | Password |
|------|-------|----------|
| Member | member@justgogreen.com | member123 |
| Donor | donor@justgogreen.com | donor123 |
| Mentor | mentor@justgogreen.com | mentor123 |
| Organizer | organizer@justgogreen.com | organizer123 |
| Admin | admin@justgogreen.com | admin123 |

---

## Documentation

Comprehensive documentation is available in the [`docs/`](./docs/) folder:

### System Architecture
- [Role-Based System](./docs/ROLE-BASED-SYSTEM.md)
- [Leveling System](./docs/LEVELING-SYSTEM.md)
- [XP vs Green Points](./docs/XP-VS-GREEN-POINTS.md)
- [Component Structure](./docs/COMPONENT-STRUCTURE.md)
- [Environment Setup](./docs/ENVIRONMENT-SETUP.md)

### Implementation Guides
- [Donor Components](./docs/DONOR-COMPONENTS-COMPLETE.md)
- [Mentor Components](./docs/MENTOR-COMPONENTS-COMPLETE.md)
- [Dialog System](./docs/DIALOG-BOXES-IMPLEMENTATION.md)
- [Climate News Component](./docs/CLIMATE-NEWS-COMPONENT.md)

### Bug Fixes & Updates
**[View Full Documentation Index](./docs/README.md)**

---

## Tech Stack

- **Framework:** Angular 18
- **UI:** Material Design (Azure Material Theme)
- **Icons:** Material Icons
- **Styling:** Custom CSS
- **State Management:** RxJS Services
- **HTTP Client:** Angular HttpClient
- **External APIs:** News API (newsapi.org)
- **Storage:** LocalStorage (demo)

---

## Design System

### Color Palette
- Primary Green: #40b181 (green-500)
- Dark Green: #32946e (green-700)
- Light Green: #7ac9a7 (green-300)
- Success: #3aa479 (green-600)
- Warning: #f57c00 (orange)
- Error: #d32f2f (red)
- Info: #5dbd94 (green-400)

### Key Components
- Card-based layouts
- Gradient buttons
- Progress indicators
- Status badges
- Professional dialogs
- Empty states

---

## Project Structure

```
time-for-green/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── shared/          # Shared components
│   │   │   │   ├── climatenews/ # Climate news component
│   │   │   │   ├── splash/      # Landing page
│   │   │   │   ├── profile/     # Profile selection
│   │   │   │   └── ...          # Other shared components
│   │   │   ├── member/          # Member features
│   │   │   ├── donors/          # Donor features
│   │   │   ├── mentors/         # Mentor features
│   │   │   ├── organizers/      # Organizer features
│   │   │   └── admin/           # Admin features
│   │   ├── services/            # Business logic
│   │   ├── guards/              # Route protection
│   │   └── shared/              # Shared utilities
│   ├── assets/                  # Static assets
│   └── styles.css               # Global styles
├── docs/                        # Documentation
│   ├── CLIMATE-NEWS-COMPONENT.md
│   ├── ROLE-BASED-SYSTEM.md
│   └── ...                      # Other documentation
└── README.md                    # This file
```

---

## Features Implemented

### Core System
- Role-based authentication
- Route guards
- XP and leveling system
- Green Points rewards
- Profile management

### Donor System
- Browse environmental projects
- Donation dialogs with suggested amounts
- Donation history with filters
- Impact report with metrics
- Community needs funding
- Receipt downloads

### Mentor System
- Create training modules
- 8 expertise areas
- Resource management (videos, documents, links, quizzes)
- Manage modules (publish, archive, delete)
- View mentees with progress tracking
- Question/Answer system
- Schedule consultation sessions

### UI/UX
- Professional Material Design dialogs
- No browser alerts/prompts
- Responsive layouts
- Loading states
- Empty states
- Error handling

### Climate News Integration
- Real-time climate and environment news
- News API integration (newsapi.org)
- 20 latest articles per fetch
- Article filtering and validation
- Responsive news grid layout
- External article links
- Time-based formatting
- Error handling with retry
- Role-specific news banners on all dashboards

---

## External API Integration

### News API Configuration

The Climate News component integrates with [News API](https://newsapi.org/) to fetch real-time climate and environment news.

**API Details:**
- **Endpoint:** `https://newsapi.org/v2/everything`
- **API Key:** Configured via environment variables
- **Query:** "climate environment"
- **Page Size:** 20 articles
- **Sort By:** Published date (newest first)
- **Language:** English

**Setup:**
1. Get your free API key from [newsapi.org](https://newsapi.org/register)
2. Configure in `src/environments/environment.ts`
3. See [Environment Setup Guide](./docs/ENVIRONMENT-SETUP.md) for detailed instructions

**Features:**
- Fetches latest climate and environment news
- Displays article images, titles, and descriptions
- Shows publication time and source
- Opens full articles in new tabs
- Handles errors gracefully with retry option
- Filters out invalid or removed articles

**Rate Limits (Free Tier):**
- 100 requests per day
- Up to 100 results per request

**Documentation:** [Climate News Component Guide](./docs/CLIMATE-NEWS-COMPONENT.md)

---

## Expertise Areas (Mentors)

1. Environmental Law
2. Forestry & Conservation
3. Climate Science
4. Renewable Energy
5. Waste Management
6. Wildlife Conservation
7. Sustainable Agriculture
8. Water Resources

---

## Leveling System

| Level | Name | XP Required |
|-------|------|-------------|
| 1 | Seedling | 0 |
| 2 | Sprout | 100 |
| 3 | Sapling | 300 |
| 4 | Young Tree | 600 |
| 5 | Growing Tree | 1,000 |
| 6 | Strong Tree | 1,500 |
| 7 | Mighty Oak | 2,100 |
| 8 | Forest Guardian | 2,800 |
| 9 | Nature's Champion | 3,600 |
| 10 | Legend | 4,500 |

---

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add documentation
5. Submit a pull request

---

## License

This project is part of the Wangari Maathai Hackathon.

---

## Acknowledgments

- Inspired by environmental activists worldwide
- Named in honor of environmental champions
- Built for the Wangari Maathai Hackathon

---

## Support

For questions or issues:
1. Check the [documentation](./docs/)
2. Review implementation guides
3. Test with provided credentials

---

## Recent Updates

### Latest (November 20, 2025)
- Climate News component with News API integration
- Real-time climate and environment news feed
- Role-specific news banners on all dashboards
- Currency changed from $ to Ksh (Kenyan Shilling)
- Emoji icons replaced with Material Icons
- Test credentials hidden in production
- "Most Popular" label removed
- Project renamed from "Just Go Green" to "Time For Green"
- Environment variables for API key management

### Previous (November 2025)
- Complete donor system (4 components)
- Complete mentor system (4 components)
- Professional dialog boxes
- Service integration fixes
- Comprehensive documentation

---

**Built with care for the environment**

[View Documentation](./docs/) | [Report Issue](#) | [Request Feature](#)
