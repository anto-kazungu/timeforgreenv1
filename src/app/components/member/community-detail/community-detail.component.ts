import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../services/auth.service';
import { CommunityService, Community, Feed } from '../../../services/community.service';
import { DialogService } from '../../../services/dialog.service';
import { AlertDialogComponent } from '../../../shared/alert-dialog/alert-dialog.component';

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
  selectedImage: File | null = null;
  selectedImagePreview: string | null = null;
  showMenuForPost: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
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
      this.removeImage();
    }
  }

  createPost() {
    if (!this.newPostContent.trim()) {
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Content Required',
          message: 'Please enter some content for your post before submitting.',
          type: 'warning'
        }
      });
      return;
    }

    if (this.community) {
      const currentUser = this.authService.getCurrentUser();
      const authorName = currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'Anonymous';
      const authorId = currentUser?.id || 'anonymous';

      const postData: any = {
        author: authorName,
        authorId: authorId,
        content: this.newPostContent.trim()
      };

      // Add image if selected
      if (this.selectedImagePreview) {
        postData.image = this.selectedImagePreview;
      }

      this.communityService.addPost(this.community.id, postData);

      // Reload community to show new post
      this.community = this.communityService.getCommunityById(this.community.id);
      
      // Reset form
      this.newPostContent = '';
      this.showPostForm = false;
      this.removeImage();
      
      // Show success dialog
      this.dialog.open(AlertDialogComponent, {
        data: {
          title: 'Success',
          message: 'Your post has been created successfully and is now visible to the community!',
          type: 'success'
        }
      });
    }
  }

  cancelPost() {
    this.newPostContent = '';
    this.showPostForm = false;
    this.removeImage();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      this.selectedImage = file;

      // Create preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.selectedImage = null;
    this.selectedImagePreview = null;
  }

  goBack() {
    this.router.navigate(['/community']);
  }

  logout() {
    this.authService.logout();
  }

  canDeletePost(feed: Feed): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser?.id === feed.authorId;
  }

  togglePostMenu(postId: string) {
    this.showMenuForPost = this.showMenuForPost === postId ? null : postId;
  }

  deletePost(postId: string) {
    this.dialogService.confirm(
      'Delete Post',
      'Are you sure you want to delete this post? This action cannot be undone.'
    ).subscribe(confirmed => {
      if (confirmed && this.community) {
        this.communityService.deletePost(this.community.id, postId);
        this.community = this.communityService.getCommunityById(this.community.id);
        this.showMenuForPost = null;
        
        this.dialog.open(AlertDialogComponent, {
          data: {
            title: 'Success',
            message: 'Post deleted successfully',
            type: 'success'
          }
        });
      }
    });
  }
}
