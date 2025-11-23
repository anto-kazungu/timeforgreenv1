import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommunityService, Community } from '../../../services/community.service';
import { PointsService } from '../../../services/points.service';
import { XPService } from '../../../services/xp.service';

@Component({
  selector: 'app-organizer-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './organizer-dashboard.component.html',
  styleUrl: './organizer-dashboard.component.css'
})
export class OrganizerDashboardComponent implements OnInit {
  userName = 'Organizer';
  greenPoints = 850;
  userLevel = 1;
  levelName = 'Rookie';
  levelIcon = 'eco';
  
  managedCommunities: Community[] = [];
  totalMembers = 0;
  totalPosts = 0;
  activeEvents = 0;
  totalTreesPlanted = 0;

  stats = [
    { label: 'Communities', value: 0, icon: 'groups', color: 'var(--green-600)' },
    { label: 'Total Members', value: 0, icon: 'people', color: 'var(--green-500)' },
    { label: 'Trees Planted', value: 0, icon: 'park', color: 'var(--green-400)' },
    { label: 'Posts', value: 0, icon: 'article', color: 'var(--green-300)' },
    { label: 'Active Events', value: 0, icon: 'event', color: 'var(--green-700)' }
  ];

  quickActions = [
    { label: 'Create Community', icon: 'add_circle', route: '/organizer/create-community' },
    { label: 'Manage Communities', icon: 'settings', route: '/organizer/manage' },
    { label: 'View Posts', icon: 'article', route: '/organizer/posts' },
    { label: 'My Profile', icon: 'person', route: '/profile-settings' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private communityService: CommunityService,
    private pointsService: PointsService,
    private xpService: XPService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.firstName;
    }

    // Subscribe to points and XP
    this.pointsService.points$.subscribe(points => {
      this.greenPoints = points;
    });

    this.xpService.xp$.subscribe(() => {
      this.updateLevelInfo();
    });

    this.updateLevelInfo();
    this.loadOrganizerData();
  }

  private updateLevelInfo() {
    const currentLevel = this.xpService.getCurrentLevel();
    this.userLevel = currentLevel.level;
    this.levelName = currentLevel.name;
    this.levelIcon = currentLevel.icon;
  }

  private loadOrganizerData() {
    // Get current user (organizer)
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Get communities managed by this organizer
    // For now, showing all communities. In production, filter by organizerId
    this.managedCommunities = this.communityService.getAllCommunities();
    
    // Calculate stats
    this.totalMembers = this.managedCommunities.reduce((sum, comm) => sum + comm.members, 0);
    this.totalPosts = this.managedCommunities.reduce((sum, comm) => sum + comm.feeds.length, 0);
    this.activeEvents = 3; // Mock data - can be extended with events service

    // Load trees planted
    this.loadTreesPlanted();

    // Update stats array
    this.stats[0].value = this.managedCommunities.length;
    this.stats[1].value = this.totalMembers;
    this.stats[2].value = this.totalTreesPlanted;
    this.stats[3].value = this.totalPosts;
    this.stats[4].value = this.activeEvents;
  }

  private loadTreesPlanted() {
    const logs = localStorage.getItem('treePlantingLogs');
    if (logs) {
      const treeLogs = JSON.parse(logs);
      this.totalTreesPlanted = treeLogs.reduce((total: number, log: any) => total + log.count, 0);
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  viewCommunity(communityId: string) {
    this.router.navigate(['/organizer/manage', communityId]);
  }

  goToProfile() {
    this.router.navigate(['/profile-settings']);
  }

  navigateToClimateNews() {
    this.router.navigate(['/climate-news']);
  }

  logout() {
    this.authService.logout();
  }
}
