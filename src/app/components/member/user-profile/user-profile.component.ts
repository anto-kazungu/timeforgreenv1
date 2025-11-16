import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommunityService } from '../../../services/community.service';

@Component({
  selector: 'app-user-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {
  user: any;
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  bio = '';
  greenPoints = 850;
  userLevel = 1;
  communitiesCount = 0;
  updateMessage = '';
  updateSuccess = false;

  achievements = [
    {
      icon: '🌱',
      title: 'First Steps',
      description: 'Join your first community',
      unlocked: true
    },
    {
      icon: '♻️',
      title: 'Recycling Champion',
      description: 'Participate in 5 recycling events',
      unlocked: false
    },
    {
      icon: '🌳',
      title: 'Tree Planter',
      description: 'Plant 10 trees',
      unlocked: true
    },
    {
      icon: '💧',
      title: 'Water Warrior',
      description: 'Complete water conservation training',
      unlocked: false
    },
    {
      icon: '👥',
      title: 'Community Leader',
      description: 'Lead a community initiative',
      unlocked: false
    }
  ];

  constructor(
    private router: Router,
    private authService: AuthService,
    private communityService: CommunityService
  ) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    if (this.user) {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.username = this.user.username;
      this.email = this.user.email;
      this.bio = this.user.bio || '';
    }

    this.communitiesCount = this.communityService.getUserCommunities().length;
  }

  updateProfile() {
    if (!this.firstName || !this.lastName || !this.username || !this.email) {
      this.updateMessage = 'Please fill in all required fields';
      this.updateSuccess = false;
      return;
    }

    // Update user info (in a real app, this would call an API)
    this.user.firstName = this.firstName;
    this.user.lastName = this.lastName;
    this.user.username = this.username;
    this.user.email = this.email;
    this.user.bio = this.bio;

    // Update in localStorage
    localStorage.setItem('currentUser', JSON.stringify(this.user));

    this.updateMessage = 'Profile updated successfully!';
    this.updateSuccess = true;

    setTimeout(() => {
      this.updateMessage = '';
    }, 3000);
  }

  resetForm() {
    if (this.user) {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.username = this.user.username;
      this.email = this.user.email;
      this.bio = this.user.bio || '';
    }
    this.updateMessage = '';
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
  }
}
