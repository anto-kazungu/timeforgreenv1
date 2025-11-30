import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { trigger, style, transition, animate } from '@angular/animations';

interface Slide {
  url: string;
  alt: string;
}

@Component({
  selector: 'app-splash',
  imports: [CommonModule],
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate('800ms 400ms cubic-bezier(0.4, 0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('logoAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5) rotate(-10deg)' }),
        animate('1000ms cubic-bezier(0.34, 1.56, 0.64, 1)', 
          style({ opacity: 1, transform: 'scale(1) rotate(0deg)' }))
      ])
    ])
  ]
})
export class SplashComponent implements OnInit, OnDestroy {
  currentSlide = 0;
  private slideInterval: any;
  private readonly SLIDE_DURATION = 5000; // 5 seconds per slide

  slides: Slide[] = [
    {
      url: '/assets/splashscreenimages/deforestation.png',
      alt: 'Environmental Challenge'
    },
    {
      url: '/assets/splashscreenimages/reforestation.png',
      alt: 'Green Solution'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    this.startSlideshow();
  }

  ngOnDestroy() {
    this.stopSlideshow();
  }

  startSlideshow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, this.SLIDE_DURATION);
  }

  stopSlideshow() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    // Restart the interval when manually changing slides
    this.stopSlideshow();
    this.startSlideshow();
  }

  goToWhyGoGreen() {
    this.router.navigate(['/why-go-green']);
  }

  startJourney() {
    // Set sessionStorage to trigger celebration
    sessionStorage.setItem('celebrate', 'true');
    this.router.navigate(['/profile']);
  }
}
