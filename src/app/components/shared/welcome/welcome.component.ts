import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-welcome',
  imports: [FormsModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  emailOrUsername = '';
  password = '';
  errorMessage = '';

  constructor(private router: Router, private authService: AuthService) {}

  login() {
    if (!this.emailOrUsername || !this.password) {
      this.errorMessage = 'Please fill in all fields';
      return;
    }

    const success = this.authService.login(this.emailOrUsername, this.password);
    if (!success) {
      this.errorMessage = 'Invalid credentials. Check the test credentials above.';
    }
    // Note: AuthService handles redirect based on user role
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goBack() {
    this.router.navigate(['/profile']);
  }
}
