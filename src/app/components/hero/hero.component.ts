import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class HeroComponent implements OnInit {
  private router = inject(Router);

  searchParams = {
    title: '',
    location: '',
    domain: ''
  };

  constructor() {}

  ngOnInit() {}

  searchJobs() {
    const queryParams: Record<string, string> = {};

    if (this.searchParams.title) {
      queryParams['title'] = this.searchParams.title;
    }

    if (this.searchParams.location) {
      queryParams['location'] = this.searchParams.location;
    }

    if (this.searchParams.domain) {
      queryParams['domain'] = this.searchParams.domain;
    }

    this.router.navigate(['/jobs'], {
      queryParams
    });
  }
}
