import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css'
})
export class LandingPage {
  constructor(private router: Router) { }

  year: number = new Date().getFullYear();

  navigate(path: string): void {
    this.router.navigate([path]);
  }
}
