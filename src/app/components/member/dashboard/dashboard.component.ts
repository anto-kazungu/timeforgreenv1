import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PostService, Post } from '../../../services/post.service';
import { PointsService } from '../../../services/points.service';
import { XPService } from '../../../services/xp.service';
import { CommunityService } from '../../../services/community.service';
import { TopNavComponent } from '../../shared/top-nav/top-nav.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TopNavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activeTab = 'communities';
  userName = 'User';
  greenPoints = 850;
  userLevel = 1;
  levelName = 'Rookie';
  levelIcon = '🌱';
  posts: Post[] = [];

  trendingItems = [
    { 
      label: 'Water Pollution', 
      image: './assets/component-images/river.jpg',
      engagement: '45'
    },
    { 
      label: 'River Cleanup', 
      image: './assets/component-images/road-pollution.jpg',
      engagement: '32'
    },
    { 
      label: 'Community Board', 
      image: './assets/component-images/community.jpg',
      engagement: '28'
    },
    { 
      label: 'Waste Management', 
      image: './assets/component-images/pollutedriver.jpg',
      engagement: '56'
    },
    { 
      label: 'Green Initiative', 
      image: './assets/component-images/training.jpg',
      engagement: '41'
    },
    { 
      label: 'Education', 
      image: './assets/component-images/community.jpg',
      engagement: '67'
    },
    { 
      label: 'Recycling', 
      image: './assets/component-images/pollutedriver2.jpg',
      engagement: '23'
    }
  ];

  constructor(
    private router: Router, 
    private authService: AuthService,
    private postService: PostService,
    private pointsService: PointsService,
    private xpService: XPService,
    private communityService: CommunityService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.firstName;
    }
    this.posts = this.postService.getAllPosts();
    
    // Subscribe to green points changes
    this.pointsService.points$.subscribe(points => {
      this.greenPoints = points;
    });
    
    // Subscribe to XP changes and update level
    this.xpService.xp$.subscribe(() => {
      this.updateLevelInfo();
    });
    
    // Initial level update
    this.updateLevelInfo();
    
    // Load tree planting data
    this.loadTreePlantingData();
  }
  
  private updateLevelInfo() {
    const currentLevel = this.xpService.getCurrentLevel();
    this.userLevel = currentLevel.level;
    this.levelName = currentLevel.name;
    this.levelIcon = currentLevel.icon;
  }

  navigateToTab(tab: string) {
    this.activeTab = tab;
    
    switch(tab) {
      case 'communities':
        this.router.navigate(['/community']);
        break;
      case 'trainings':
        this.router.navigate(['/trainings']);
        break;
      case 'rewards':
        this.router.navigate(['/rewards']);
        break;
      case 'events':
        this.router.navigate(['/events']);
        break;
    }
  }

  goToProfile() {
    this.router.navigate(['/profile-settings']);
  }

  viewTrendingItem(item: any) {
    // Find matching post by title
    const post = this.posts.find(p => p.title.includes(item.label));
    if (post) {
      this.router.navigate(['/trending', post.id]);
    }
  }

  viewPost(postId: string) {
    this.router.navigate(['/trending', postId]);
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }

  navigateToClimateNews() {
    this.router.navigate(['/climate-news']);
  }

  logout() {
    this.authService.logout();
  }



  get totalTreesPlanted(): number {
    const logs = localStorage.getItem('treePlantingLogs');
    if (logs) {
      const treeLogs = JSON.parse(logs);
      return treeLogs.reduce((total: number, log: any) => total + log.count, 0);
    }
    return 0;
  }

  get communitiesCount(): number {
    return this.communityService.getUserCommunities().length;
  }
  
  private loadTreePlantingData() {
    // This method ensures tree data is loaded on init
    // The getter will handle the actual calculation
  }
}
