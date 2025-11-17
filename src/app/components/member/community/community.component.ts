import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommunityService, Community } from '../../../services/community.service';
import { PointsService } from '../../../services/points.service';
import { DialogService } from '../../../services/dialog.service';

@Component({
  selector: 'app-community',
  imports: [CommonModule, FormsModule],
  templateUrl: './community.component.html',
  styleUrl: './community.component.css'
})
export class CommunityComponent implements OnInit {
  userCommunities: Community[] = [];
  showJoinModal = false;
  communityCode = '';
  joinMessage = '';
  joinSuccess = false;
  availableCodes: string[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private communityService: CommunityService,
    private pointsService: PointsService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadUserCommunities();
    this.loadAvailableCodes();
  }

  loadUserCommunities() {
    this.userCommunities = this.communityService.getUserCommunities();
  }

  loadAvailableCodes() {
    this.availableCodes = this.communityService.getAllCommunities().map(c => c.code);
  }

  joinCommunity() {
    if (!this.communityCode.trim()) {
      this.joinMessage = 'Please enter a community code';
      this.joinSuccess = false;
      return;
    }

    const result = this.communityService.joinCommunity(this.communityCode, this.pointsService);
    this.joinMessage = result.message;
    this.joinSuccess = result.success;

    if (result.success) {
      this.loadUserCommunities();
      setTimeout(() => {
        this.closeJoinModal();
      }, 1500);
    }
  }

  leaveCommunity(communityId: string, event: Event) {
    event.stopPropagation();
    
    const community = this.communityService.getCommunityById(communityId);
    const communityName = community?.name || 'this community';
    
    this.dialogService.confirm(
      'Leave Community',
      `Are you sure you want to leave ${communityName}? You can rejoin anytime using the community code.`
    ).subscribe(confirmed => {
      if (confirmed) {
        this.communityService.leaveCommunity(communityId);
        this.loadUserCommunities();
      }
    });
  }

  viewCommunity(communityId: string) {
    this.router.navigate(['/community', communityId]);
  }

  closeJoinModal() {
    this.showJoinModal = false;
    this.communityCode = '';
    this.joinMessage = '';
    this.joinSuccess = false;
  }

  goBack() {
    this.router.navigate([this.authService.getRoleDashboard()]);
  }

  logout() {
    this.authService.logout();
  }
}
