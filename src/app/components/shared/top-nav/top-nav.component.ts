import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {
  @Input() pageTitle: string = 'Dashboard';
  @Input() showBackButton: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  getCurrentDate(): string {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date().toLocaleDateString('en-US', options);
  }

  getUserInitials(): string {
    const user = this.authService.getCurrentUser();
    if (user && user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase();
    }
    return 'U';
  }

  getUserName(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.firstName : 'User';
  }

  goBack() {
    this.router.navigate([this.authService.getRoleDashboard()]);
  }

  goToProfile() {
    this.router.navigate(['/profile-settings']);
  }

  navigateToClimateNews() {
    this.router.navigate(['/climate-news']);
  }
}
