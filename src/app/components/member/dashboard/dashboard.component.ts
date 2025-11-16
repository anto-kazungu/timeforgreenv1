import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PostService, Post } from '../../../services/post.service';
import { PointsService } from '../../../services/points.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  activeTab = 'communities';
  userName = 'User';
  greenPoints = 850;
  posts: Post[] = [];

  trendingItems = [
    { 
      label: 'Water Pollution', 
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      engagement: '45'
    },
    { 
      label: 'River Cleanup', 
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      engagement: '32'
    },
    { 
      label: 'Community Board', 
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      engagement: '28'
    },
    { 
      label: 'Waste Management', 
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      engagement: '56'
    },
    { 
      label: 'Green Initiative', 
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      engagement: '41'
    },
    { 
      label: 'Education', 
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      engagement: '67'
    },
    { 
      label: 'Recycling', 
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      engagement: '23'
    }
  ];

  constructor(
    private router: Router, 
    private authService: AuthService,
    private postService: PostService,
    private pointsService: PointsService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.firstName;
    }
    this.posts = this.postService.getAllPosts();
    
    // Subscribe to points changes
    this.pointsService.points$.subscribe(points => {
      this.greenPoints = points;
    });
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

  logout() {
    this.authService.logout();
  }
}
