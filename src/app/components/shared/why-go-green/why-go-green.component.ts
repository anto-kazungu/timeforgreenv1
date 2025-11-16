import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-why-go-green',
  imports: [],
  templateUrl: './why-go-green.component.html',
  styleUrl: './why-go-green.component.css'
})
export class WhyGoGreenComponent {
  constructor(private router: Router) {}

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
