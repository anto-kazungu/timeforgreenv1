import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-splash',
  imports: [CommonModule],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css'
})
export class SplashComponent {
  videoStarted = false;
  showGoGreenButton = false;
  videoUrl: SafeResourceUrl;

  constructor(private router: Router, private sanitizer: DomSanitizer) {
    // Convert YouTube URL to embed URL with autoplay
    const youtubeEmbedUrl = 'https://www.youtube.com/embed/IBsK9KNFL7I?si=A_b6dYQlGaAEXjUp';
    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(youtubeEmbedUrl);
  }

  startVideo() {
    this.videoStarted = true;
    
    // Show GO GREEN button after 1 minute (30 seconds)
    setTimeout(() => {
      this.showGoGreenButton = true;
    }, 30000); // 30000 milliseconds = 30 seconds
  }

  goToProfile() {
    // Set celebration flag in sessionStorage
    sessionStorage.setItem('celebrate', 'true');
    this.router.navigate(['/profile'], { 
      state: { fromSplash: true } 
    });
  }
}
