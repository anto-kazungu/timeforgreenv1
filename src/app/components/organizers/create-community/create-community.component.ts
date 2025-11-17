import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommunityService } from '../../../services/community.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-create-community',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-community.component.html',
  styleUrl: './create-community.component.css'
})
export class CreateCommunityComponent {
  communityName = '';
  description = '';
  category = 'environmental';
  isPrivate = false;
  generatedCode = '';

  categories = [
    { value: 'environmental', label: 'Environmental Action', icon: 'eco' },
    { value: 'education', label: 'Education & Awareness', icon: 'school' },
    { value: 'recycling', label: 'Recycling & Waste', icon: 'recycling' },
    { value: 'conservation', label: 'Conservation', icon: 'park' },
    { value: 'climate', label: 'Climate Action', icon: 'thermostat' },
    { value: 'community', label: 'Community Building', icon: 'groups' }
  ];

  gradients = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
  ];

  selectedGradient = this.gradients[0];

  constructor(
    private router: Router,
    private communityService: CommunityService,
    private notificationService: NotificationService
  ) {}

  selectGradient(gradient: string) {
    this.selectedGradient = gradient;
  }

  generateCode() {
    this.generatedCode = this.communityService.generateCode();
  }

  createCommunity() {
    if (!this.communityName || !this.description) {
      this.notificationService.showError('Please fill in all required fields');
      return;
    }

    if (!this.generatedCode) {
      this.generateCode();
    }

    // Verify code is unique
    if (!this.communityService.isCodeUnique(this.generatedCode)) {
      this.notificationService.showError('Code already exists. Please generate a new one.');
      return;
    }

    // Get current user ID (organizer)
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    const newCommunity = this.communityService.createCommunity({
      name: this.communityName,
      description: this.description,
      code: this.generatedCode,
      gradient: this.selectedGradient,
      category: this.category,
      isPrivate: this.isPrivate,
      organizerId: currentUser.id || 'default-organizer'
    });

    this.notificationService.showSuccess(`Community "${this.communityName}" created successfully!`);
    
    setTimeout(() => {
      this.router.navigate(['/organizer/dashboard']);
    }, 1500);
  }

  cancel() {
    this.router.navigate(['/organizer']);
  }
}
