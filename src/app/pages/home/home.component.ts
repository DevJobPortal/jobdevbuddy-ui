import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { JobCategory } from './types/job-category.type';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';

@Component({
  selector: 'app-root',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [FormsModule, HeroComponent],
})
export class HomeComponent {
  title = signal('JobDevBuddy');
  searchQuery = signal('');
  locationQuery = signal('');

  recentJobs = signal([
    {
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      companyInitial: 'TS',
      location: 'Remote',
      type: 'Full-time',
      salary: '$120k - $150k',
      postedTime: '2 hours ago',
    },
    {
      title: 'Backend Engineer',
      company: 'Innovation Labs',
      companyInitial: 'IL',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$130k - $160k',
      postedTime: '4 hours ago',
    },
    {
      title: 'DevOps Engineer',
      company: 'Cloud Systems Inc',
      companyInitial: 'CSI',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$140k - $170k',
      postedTime: '6 hours ago',
    },
    {
      title: 'UI/UX Designer',
      company: 'Creative Digital',
      companyInitial: 'CD',
      location: 'Los Angeles, CA',
      type: 'Contract',
      salary: '$90k - $120k',
      postedTime: '8 hours ago',
    },
  ]);

  searchJobs() {
    // TODO: Implement job search functionality
    console.log(
      'Searching for:',
      this.searchQuery(),
      'in',
      this.locationQuery()
    );
  }
}
