import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { DonationService, Project, Donation, DonationImpact, CommunityNeed } from '../../../services/donation.service';
import { PointsService } from '../../../services/points.service';
import { XPService } from '../../../services/xp.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-donor-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donor-dashboard.component.html',
  styleUrl: './donor-dashboard.component.css'
})
export class DonorDashboardComponent implements OnInit {
  userName = 'Donor';
  greenPoints = 2500;
  userLevel = 4;
  levelName = 'Champion';
  levelIcon = 'volunteer_activism';
  
  recentDonations: Donation[] = [];
  activeProjects: Project[] = [];
  communityNeeds: CommunityNeed[] = [];
  donationImpact: DonationImpact = {
    totalDonated: 0,
    projectsFunded: 0,
    livesImpacted: 0,
    co2Reduced: 0,
    treesPlanted: 0,
    wasteRecycled: 0
  };

  stats = [
    { label: 'Total Donated', value: 'Ksh 0', icon: 'payments', color: '#667eea' },
    { label: 'Projects Funded', value: 0, icon: 'campaign', color: '#f093fb' },
    { label: 'Lives Impacted', value: 0, icon: 'favorite', color: '#43e97b' },
    { label: 'CO₂ Reduced', value: '0 tons', icon: 'eco', color: '#fa709a' }
  ];

  quickActions = [
    { label: 'Browse Projects', icon: 'search', route: '/donor/projects' },
    { label: 'Donation History', icon: 'history', route: '/donor/history' },
    { label: 'Impact Report', icon: 'analytics', route: '/donor/impact' },
    { label: 'Community Needs', icon: 'help', route: '/donor/needs' },
    { label: 'My Profile', icon: 'person', route: '/profile-settings' }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private donationService: DonationService,
    private pointsService: PointsService,
    private xpService: XPService,
    private dialogService: DialogService
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
    this.loadDonorData();
  }

  private updateLevelInfo() {
    const currentLevel = this.xpService.getCurrentLevel();
    this.userLevel = currentLevel.level;
    this.levelName = currentLevel.name;
    this.levelIcon = currentLevel.icon;
  }

  private loadDonorData() {
    // Get current donor ID
    const currentUser = this.authService.getCurrentUser();
    const donorId = currentUser?.id || 'donor-1';

    // Load donor's donations
    this.recentDonations = this.donationService.getDonationsByDonor(donorId)
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .slice(0, 5);

    // Load active projects
    this.activeProjects = this.donationService.getActiveProjects().slice(0, 4);

    // Load community needs
    this.communityNeeds = this.donationService.getOpenNeeds()
      .sort((a, b) => {
        const urgencyOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      })
      .slice(0, 3);

    // Calculate impact
    this.donationImpact = this.donationService.getDonorImpact(donorId);

    // Update stats
    this.stats[0].value = `Ksh ${this.donationImpact.totalDonated.toLocaleString()}`;
    this.stats[1].value = this.donationImpact.projectsFunded;
    this.stats[2].value = this.donationImpact.livesImpacted;
    this.stats[3].value = `${this.donationImpact.co2Reduced} tons`;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  viewProject(projectId: string) {
    this.router.navigate(['/donor/projects', projectId]);
  }

  donateToProject(projectId: string) {
    this.router.navigate(['/donor/donate', projectId]);
  }

  viewNeed(needId: string) {
    this.router.navigate(['/donor/needs', needId]);
  }

  fundNeed(needId: string) {
    // Simple funding - in production would show donation form
    const amount = prompt('Enter donation amount (Ksh):');
    if (amount && !isNaN(Number(amount))) {
      const currentUser = this.authService.getCurrentUser();
      if (currentUser && this.donationService.fundCommunityNeed(needId, Number(amount), currentUser.id)) {
        alert(`Successfully donated Ksh ${amount}!`);
        this.loadDonorData(); // Refresh data
      }
    }
  }

  getProjectProgress(project: Project): number {
    return Math.min((project.currentAmount / project.targetAmount) * 100, 100);
  }

  getNeedProgress(need: CommunityNeed): number {
    return Math.min((need.fundedAmount / need.estimatedCost) * 100, 100);
  }

  getUrgencyColor(urgency: string): string {
    switch (urgency) {
      case 'critical': return '#f44336';
      case 'high': return '#ff9800';
      case 'medium': return '#2196f3';
      case 'low': return '#4caf50';
      default: return '#666';
    }
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Recently';
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