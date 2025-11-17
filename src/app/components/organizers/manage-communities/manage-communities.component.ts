import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommunityService, Community } from '../../../services/community.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-manage-communities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-communities.component.html',
  styleUrl: './manage-communities.component.css'
})
export class ManageCommunitiesComponent implements OnInit {
  communities: Community[] = [];

  constructor(
    private router: Router,
    private communityService: CommunityService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadCommunities();
  }

  loadCommunities() {
    // Get current user (organizer)
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Get all communities (in a real app, filter by organizerId)
    // For now, showing all communities as the organizer can manage them
    this.communities = this.communityService.getAllCommunities();
  }

  goBack() {
    this.router.navigate(['/organizer']);
  }

  editCommunity(communityId: string) {
    // For now, just show an alert. In a real app, navigate to edit page
    const community = this.communityService.getCommunityById(communityId);
    if (community) {
      const newName = prompt('Edit Community Name:', community.name);
      if (newName && newName.trim()) {
        this.communityService.updateCommunity(communityId, { name: newName.trim() });
        this.loadCommunities();
      }
    }
  }

  viewPosts(communityId: string) {
    this.router.navigate(['/organizer/posts'], { queryParams: { communityId } });
  }

  deleteCommunity(communityId: string) {
    const community = this.communityService.getCommunityById(communityId);
    if (community && confirm(`Are you sure you want to delete "${community.name}"? This action cannot be undone.`)) {
      if (this.communityService.deleteCommunity(communityId)) {
        this.loadCommunities();
        alert('Community deleted successfully!');
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
