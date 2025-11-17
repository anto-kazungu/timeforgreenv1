import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PostService, Post } from '../../../services/post.service';

@Component({
  selector: 'app-trending-detail',
  imports: [CommonModule, FormsModule],
  templateUrl: './trending-detail.component.html',
  styleUrl: './trending-detail.component.css'
})
export class TrendingDetailComponent implements OnInit {
  post: Post | undefined;
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) {
      this.post = this.postService.getPostById(postId);
    }
  }

  toggleLike() {
    if (this.post) {
      this.postService.toggleLike(this.post.id);
    }
  }

  addComment() {
    if (this.post && this.newComment.trim()) {
      const user = this.authService.getCurrentUser();
      const author = user ? `${user.firstName} ${user.lastName}` : 'Anonymous';
      
      this.postService.addComment(this.post.id, this.newComment, author);
      this.newComment = '';
      
      // Refresh post data
      this.post = this.postService.getPostById(this.post.id);
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

  goBack() {
    this.router.navigate([this.authService.getRoleDashboard()]);
  }

  logout() {
    this.authService.logout();
  }
}
