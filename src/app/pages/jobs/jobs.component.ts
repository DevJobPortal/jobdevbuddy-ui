import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  domain: string;
  salary: string;
  postedTime: string;
  jobType: string;
  logo?: string;
}

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="bg-primary/10 rounded-lg shadow-md p-6 mb-8 border border-[#004D40]/20">
        <h2 class="text-xl font-semibold mb-4 text-white">Filter Jobs</h2>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-white mb-1">Job Title</label>
            <input
              type="text"
              class="w-full h-[42px] px-4 bg-white/90 rounded-md border-0 outline-none text-gray-700 placeholder-gray-500"
              placeholder="Search by title"
              [ngModel]="filters.title"
              (ngModelChange)="updateFilter('title', $event)"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-white mb-1">Location</label>
            <select
              class="w-full h-[42px] px-4 bg-white/90 rounded-md border-0 outline-none text-gray-700 appearance-none"
              [ngModel]="filters.location"
              (ngModelChange)="updateFilter('location', $event)"
            >
              <option value="">All Locations</option>
              <option value="new-york">New York</option>
              <option value="san-francisco">San Francisco</option>
              <option value="london">London</option>
              <option value="remote">Remote</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-white mb-1">Domain</label>
            <select
              class="w-full h-[42px] px-4 bg-white/90 rounded-md border-0 outline-none text-gray-700 appearance-none"
              [ngModel]="filters.domain"
              (ngModelChange)="updateFilter('domain', $event)"
            >
              <option value="">All Domains</option>
              <option value="technology">Technology</option>
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="finance">Finance</option>
            </select>
          </div>

          <div class="flex items-end">
            <button
              class="w-full h-[42px] bg-[#2A9D8F] hover:bg-[#238379] text-white font-medium rounded-md transition-colors"
              (click)="applyFilters()"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-primary">{{ filteredJobs.length }} Jobs Found</h1>
        <div class="flex gap-2">
          <button class="btn-secondary-outline px-3 py-1 text-sm">
            Newest First
          </button>
          <button class="btn-secondary-outline px-3 py-1 text-sm">
            Highest Salary
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        @for (job of filteredJobs; track job.id) {
          <div
            class="card hover:shadow-lg transition-all duration-200 cursor-pointer"
            (click)="viewJobDetails(job.id)"
          >
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center">
                @if (job.logo) {
                  <img [src]="job.logo" [alt]="job.company + ' logo'" class="object-contain w-8 h-8" />
                } @else {
                  <span class="text-secondary-600 dark:text-secondary-300">{{ job.company.charAt(0) }}</span>
                }
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-secondary-900 dark:text-white">{{ job.title }}</h3>
                <p class="text-secondary-600 dark:text-secondary-400">{{ job.company }}</p>
                <div class="flex flex-wrap gap-2 mt-2">
                  <span class="text-sm px-2 py-1 rounded bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300">
                    {{ job.location }}
                  </span>
                  <span class="text-sm px-2 py-1 rounded bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300">
                    {{ job.domain }}
                  </span>
                  <span class="text-sm px-2 py-1 rounded bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300">
                    {{ job.jobType }}
                  </span>
                </div>
                <div class="flex justify-between items-center mt-3">
                  <span class="font-medium text-primary">{{ job.salary }}</span>
                  <span class="text-xs text-secondary-500 dark:text-secondary-400">{{ job.postedTime }}</span>
                </div>
              </div>
            </div>
          </div>
        } @empty {
          <div class="card text-center py-12">
            <h3 class="text-xl font-semibold text-gray-600">No jobs found matching your criteria</h3>
            <p class="mt-2 text-gray-500">Try adjusting your filters or search terms</p>
            <button class="btn-primary mt-4" (click)="resetFilters()">Reset Filters</button>
          </div>
        }
      </div>

      @if (filteredJobs.length > 0) {
        <div class="mt-8 flex justify-center">
          <nav class="flex items-center gap-1">
            <button class="size-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Previous</span>
              <svg class="size-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </button>

            <button class="size-10 flex items-center justify-center rounded-md border border-primary bg-primary text-white">
              1
            </button>
            <button class="size-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              2
            </button>
            <button class="size-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              3
            </button>

            <span class="size-10 flex items-center justify-center text-gray-500">
              ...
            </span>

            <button class="size-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
              8
            </button>

            <button class="size-10 flex items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
              <span class="sr-only">Next</span>
              <svg class="size-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </button>
          </nav>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class JobsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  filters = {
    title: '',
    location: '',
    domain: ''
  };

  jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Solutions',
      location: 'Remote',
      domain: 'technology',
      salary: '$120k - $150k',
      postedTime: '2 hours ago',
      jobType: 'Full-time'
    },
    {
      id: '2',
      title: 'Backend Engineer',
      company: 'Innovation Labs',
      location: 'New York, NY',
      domain: 'technology',
      salary: '$130k - $160k',
      postedTime: '4 hours ago',
      jobType: 'Full-time'
    },
    {
      id: '3',
      title: 'DevOps Engineer',
      company: 'Cloud Systems Inc.',
      location: 'San Francisco, CA',
      domain: 'technology',
      salary: '$140k - $170k',
      postedTime: '6 hours ago',
      jobType: 'Full-time'
    },
    {
      id: '4',
      title: 'UI/UX Designer',
      company: 'Creative Digital',
      location: 'Los Angeles, CA',
      domain: 'technology',
      salary: '$90k - $120k',
      postedTime: '8 hours ago',
      jobType: 'Contract'
    },
    {
      id: '5',
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'Boston, MA',
      domain: 'technology',
      salary: '$110k - $140k',
      postedTime: '10 hours ago',
      jobType: 'Full-time'
    },
    {
      id: '6',
      title: 'Product Manager',
      company: 'Innovate Tech',
      location: 'Seattle, WA',
      domain: 'technology',
      salary: '$125k - $155k',
      postedTime: '12 hours ago',
      jobType: 'Full-time'
    },
    {
      id: '7',
      title: 'Nurse Practitioner',
      company: 'City Hospital',
      location: 'Chicago, IL',
      domain: 'healthcare',
      salary: '$95k - $115k',
      postedTime: '1 day ago',
      jobType: 'Full-time'
    },
    {
      id: '8',
      title: 'Financial Analyst',
      company: 'Global Finance',
      location: 'New York, NY',
      domain: 'finance',
      salary: '$85k - $110k',
      postedTime: '1 day ago',
      jobType: 'Full-time'
    }
  ];

  filteredJobs: Job[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.filters = {
        title: params['title'] || '',
        location: params['location'] || '',
        domain: params['domain'] || ''
      };

      this.filterJobs();
    });
  }

  updateFilter(key: string, value: string) {
    (this.filters as any)[key] = value;
    this.filterJobs();
  }

  viewJobDetails(jobId: string) {
    this.router.navigate(['/jobs', jobId]);
  }

  applyFilters() {
    const queryParams: any = {};

    if (this.filters.title) queryParams.title = this.filters.title;
    if (this.filters.location) queryParams.location = this.filters.location;
    if (this.filters.domain) queryParams.domain = this.filters.domain;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });

    this.filterJobs();
  }

  filterJobs() {
    this.filteredJobs = this.jobs.filter(job => {
      const titleMatch = !this.filters.title ||
        job.title.toLowerCase().includes(this.filters.title.toLowerCase());
      const locationMatch = !this.filters.location || job.location.toLowerCase() === this.filters.location.toLowerCase();
      const domainMatch = !this.filters.domain || job.domain.toLowerCase() === this.filters.domain.toLowerCase();

      return titleMatch && locationMatch && domainMatch;
    });
  }

  resetFilters() {
    this.filters = {
      title: '',
      location: '',
      domain: ''
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}
    });

    this.filterJobs();
  }

  sortJobs(criteria: string) {
    if (criteria === 'newest') {
      this.filteredJobs = [...this.filteredJobs].sort((a, b) => {
        return a.postedTime.localeCompare(b.postedTime);
      });
    } else if (criteria === 'salary') {
      this.filteredJobs = [...this.filteredJobs].sort((a, b) => {
        const salaryA = parseInt(a.salary.replace(/[^0-9]/g, ''));
        const salaryB = parseInt(b.salary.replace(/[^0-9]/g, ''));
        return salaryB - salaryA;
      });
    }
  }
}
