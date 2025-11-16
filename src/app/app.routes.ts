import { Routes } from '@angular/router';
import { SplashComponent } from './components/shared/splash/splash.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { WelcomeComponent } from './components/shared/welcome/welcome.component';
import { LoginComponent } from './components/shared/login/login.component';
import { SignupComponent } from './components/shared/signup/signup.component';
import { CommunityComponent } from './components/member/community/community.component';
import { CommunityDetailComponent } from './components/member/community-detail/community-detail.component';
import { DashboardComponent } from './components/member/dashboard/dashboard.component';
import { TrainingsComponent } from './components/member/trainings/trainings.component';
import { RewardsComponent } from './components/member/rewards/rewards.component';
import { EventsComponent } from './components/member/events/events.component';
import { UserProfileComponent } from './components/member/user-profile/user-profile.component';
import { WhyGoGreenComponent } from './components/shared/why-go-green/why-go-green.component';
import { TrendingDetailComponent } from './components/member/trending-detail/trending-detail.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { MentorDashboardComponent } from './components/mentors/mentor-dashboard/mentor-dashboard.component';
import { DonorDashboardComponent } from './components/donors/donor-dashboard/donor-dashboard.component';
import { OrganizerDashboardComponent } from './components/organizers/organizer-dashboard/organizer-dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Shared routes
  { path: '', component: SplashComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'why-go-green', component: WhyGoGreenComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent },
  
  // Member routes
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'profile-settings', component: UserProfileComponent, canActivate: [authGuard] },
  { path: 'trainings', component: TrainingsComponent, canActivate: [authGuard] },
  { path: 'rewards', component: RewardsComponent, canActivate: [authGuard] },
  { path: 'events', component: EventsComponent, canActivate: [authGuard] },
  { path: 'trending/:id', component: TrendingDetailComponent, canActivate: [authGuard] },
  { path: 'community', component: CommunityComponent, canActivate: [authGuard] },
  { path: 'community/:id', component: CommunityDetailComponent, canActivate: [authGuard] },
  
  // Role-specific dashboards
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'mentor', component: MentorDashboardComponent, canActivate: [authGuard] },
  { path: 'donor', component: DonorDashboardComponent, canActivate: [authGuard] },
  { path: 'organizer', component: OrganizerDashboardComponent, canActivate: [authGuard] }
];
