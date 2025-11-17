import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommunityService, Community, Feed } from '../../../services/community.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-community-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './community-detail.component.html',
  styleUrl: './community-detail.component.css'
})
export class CommunityDetailComponent implements OnInit {
  community: Community | undefined;
  newPostContent = '';
  showPostForm = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private communityService: CommunityService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    const communityId = this.route.snapshot.paramMap.get('id');
    if (communityId) {
      this.community = this.communityService.getCommunityById(communityId);
      
      // Check if user is a member
      if (this.community && !this.communityService.isUserMember(communityId)) {
        this.dialogService.alert('Access Denied', 'You must be a member to view this community').subscribe(() => {
          this.router.navigate(['/community']);
        });
      }
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

  toggleLike(feed: Feed) {
    if (this.community) {
      this.communityService.likePost(this.community.id, feed.id);
      // Reload community to get updated data
      this.community = this.communityService.getCommunityById(this.community.id);
    }
  }

  togglePostForm() {
    this.showPostForm = !this.showPostForm;
    if (!this.showPostForm) {
      this.newPostContent = '';
    }
  }

  createPost() {
    if (!this.newPostContent.trim()) {
      alert('Please enter some content for your post');
      return;
    }

    if (this.community) {
      const currentUser = this.authService.getCurrentUser();
      const authorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Anonymous';
      const authorId = currentUser?.id || 'anonymous';

      this.communityService.addPost(this.community.id, {
        author: authorName,
        authorId: authorId,
        content: this.newPostContent.trim()
      });

      // Reload community to show new post
      this.community = this.communityService.getCommunityById(this.community.id);
      
      // Reset form
      this.newPostContent = '';
      this.showPostForm = false;
      
      alert('Post created successfully!');
    }
  }

  cancelPost() {
    this.newPostContent = '';
    this.showPostForm = false;
  }

  goBack() {
    this.router.navigate(['/community']);
  }

  logout() {
    this.authService.logout();
  }
}
