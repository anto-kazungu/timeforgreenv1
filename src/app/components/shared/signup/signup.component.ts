import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username = '';
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  createAccount() {
    if (!this.username || !this.firstName || !this.lastName || !this.email || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    const success = this.authService.signup(
      this.username,
      this.email,
      this.password,
      this.firstName,
      this.lastName,
      'member' // Default role for new signups
    );

    if (success) {
      this.successMessage = 'Account created successfully! Redirecting...';
      // AuthService handles redirect based on role (member by default)
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
    } else {
      this.errorMessage = 'Username or email already exists';
    }
  }

  goToLogin() {
    this.router.navigate(['/welcome']);
  }
}
