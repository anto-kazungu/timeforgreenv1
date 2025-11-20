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
import { ClimatenewsComponent } from './components/shared/climatenews/climatenews.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { MentorDashboardComponent } from './components/mentors/mentor-dashboard/mentor-dashboard.component';
import { DonorDashboardComponent } from './components/donors/donor-dashboard/donor-dashboard.component';
import { OrganizerDashboardComponent } from './components/organizers/organizer-dashboard/organizer-dashboard.component';
import { CreateCommunityComponent } from './components/organizers/create-community/create-community.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Shared routes
  { path: '', component: SplashComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'why-go-green', component: WhyGoGreenComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [authGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'climate-news', component: ClimatenewsComponent, canActivate: [authGuard] },
  
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
  
  // Mentor routes
  { path: 'mentor', component: MentorDashboardComponent, canActivate: [authGuard] },
  { path: 'mentor/dashboard', component: MentorDashboardComponent, canActivate: [authGuard] },
  { path: 'mentor/create-training', loadComponent: () => import('./components/mentors/create-training/create-training.component').then(m => m.CreateTrainingComponent), canActivate: [authGuard] },
  { path: 'mentor/modules', loadComponent: () => import('./components/mentors/manage-modules/manage-modules.component').then(m => m.ManageModulesComponent), canActivate: [authGuard] },
  { path: 'mentor/mentees', loadComponent: () => import('./components/mentors/view-mentees/view-mentees.component').then(m => m.ViewMenteesComponent), canActivate: [authGuard] },
  { path: 'mentor/sessions', loadComponent: () => import('./components/mentors/schedule-session/schedule-session.component').then(m => m.ScheduleSessionComponent), canActivate: [authGuard] },
  
  // Donor routes
  { path: 'donor', component: DonorDashboardComponent, canActivate: [authGuard] },
  { path: 'donor/dashboard', component: DonorDashboardComponent, canActivate: [authGuard] },
  { path: 'donor/projects', loadComponent: () => import('./components/donors/browse-projects/browse-projects.component').then(m => m.BrowseProjectsComponent), canActivate: [authGuard] },
  { path: 'donor/history', loadComponent: () => import('./components/donors/donation-history/donation-history.component').then(m => m.DonationHistoryComponent), canActivate: [authGuard] },
  { path: 'donor/impact', loadComponent: () => import('./components/donors/impact-report/impact-report.component').then(m => m.ImpactReportComponent), canActivate: [authGuard] },
  { path: 'donor/needs', loadComponent: () => import('./components/donors/community-needs/community-needs.component').then(m => m.CommunityNeedsComponent), canActivate: [authGuard] },
  
  // Organizer routes
  { path: 'organizer', component: OrganizerDashboardComponent, canActivate: [authGuard] },
  { path: 'organizer/create-community', component: CreateCommunityComponent, canActivate: [authGuard] },
  { path: 'organizer/manage', loadComponent: () => import('./components/organizers/manage-communities/manage-communities.component').then(m => m.ManageCommunitiesComponent), canActivate: [authGuard] },
  { path: 'organizer/posts', loadComponent: () => import('./components/organizers/community-posts/community-posts.component').then(m => m.CommunityPostsComponent), canActivate: [authGuard] }
];
