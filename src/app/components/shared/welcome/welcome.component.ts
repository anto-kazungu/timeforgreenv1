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
    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      this.errorMessage = 'Invalid credentials. Try: user&#64;justgogreen.com / green123';
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goBack() {
    this.router.navigate(['/profile']);
  }
}
