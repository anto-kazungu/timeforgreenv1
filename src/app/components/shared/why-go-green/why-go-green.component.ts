import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-why-go-green',
  imports: [CommonModule],
  templateUrl: './why-go-green.component.html',
  styleUrl: './why-go-green.component.css'
})
export class WhyGoGreenComponent {
  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
