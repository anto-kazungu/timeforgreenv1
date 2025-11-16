import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

interface Confetti {
  id: number;
  left: number;
  delay: string;
  color: string;
}

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  showCelebration = false;
  confettiPieces: Confetti[] = [];

  private colors = [
    '#00d084', // Green
    '#00b870', // Dark Green
    '#FFD700', // Gold
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#FFA07A', // Light Salmon
    '#98D8C8', // Mint
    '#F7DC6F', // Yellow
    '#BB8FCE'  // Purple
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    // Check if coming from splash page
    const navigation = this.router.getCurrentNavigation();
    const fromSplash = navigation?.extras?.state?.['fromSplash'];
    
    if (fromSplash) {
      this.triggerCelebration();
    }

    // Also check sessionStorage for page refresh
    const shouldCelebrate = sessionStorage.getItem('celebrate');
    if (shouldCelebrate === 'true') {
      this.triggerCelebration();
      sessionStorage.removeItem('celebrate');
    }
  }

  triggerCelebration() {
    this.showCelebration = true;
    this.generateConfetti();

    // Stop celebration after 4 seconds
    setTimeout(() => {
      this.showCelebration = false;
      this.confettiPieces = [];
    }, 4000);
  }

  generateConfetti() {
    this.confettiPieces = [];
    const numberOfPieces = 50;

    for (let i = 0; i < numberOfPieces; i++) {
      this.confettiPieces.push({
        id: i,
        left: Math.random() * 100,
        delay: `${Math.random() * 0.5}s`,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }

  goToWelcome() {
    this.router.navigate(['/welcome']);
  }

  goToWhyGoGreen() {
    this.router.navigate(['/why-go-green']);
  }
}
