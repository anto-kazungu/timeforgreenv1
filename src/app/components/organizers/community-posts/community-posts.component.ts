import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CommunityService, Community, Feed } from '../../../services/community.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-community-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './community-posts.component.html',
  styleUrl: './community-posts.component.css'
})
export class CommunityPostsComponent implements OnInit {
  communities: Community[] = [];
  selectedCommunity: Community | null = null;
  posts: Feed[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private communityService: CommunityService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCommunities();
    
    // Check if a specific community was selected
    this.route.queryParams.subscribe(params => {
      if (params['communityId']) {
        this.selectCommunity(params['communityId']);
      }
    });
  }

  loadCommunities() {
    this.communities = this.communityService.getAllCommunities();
    if (this.communities.length > 0 && !this.selectedCommunity) {
      this.selectCommunity(this.communities[0].id);
    }
  }

  selectCommunity(communityId: string) {
    this.selectedCommunity = this.communityService.getCommunityById(communityId) || null;
    if (this.selectedCommunity) {
      this.posts = this.selectedCommunity.feeds;
    }
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

  deletePost(postId: string) {
    if (this.selectedCommunity && confirm('Are you sure you want to delete this post?')) {
      if (this.communityService.deletePost(this.selectedCommunity.id, postId)) {
        // Reload posts
        this.selectCommunity(this.selectedCommunity.id);
        alert('Post deleted successfully!');
      }
    }
  }

  goBack() {
    this.router.navigate(['/organizer']);
  }

  logout() {
    this.authService.logout();
  }
}
