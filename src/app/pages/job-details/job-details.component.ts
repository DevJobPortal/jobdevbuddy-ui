import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface JobDetail {
  id: string;
  title: string;
  company: string;
  location: string;
  domain: string;
  salary: string;
  postedTime: string;
  jobType: string;
  logo?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  companyDescription: string;
  companySize: string;
  companyIndustry: string;
  companyWebsite: string;
  applicationDeadline: string;
}

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container mx-auto px-4 py-8">
      <!-- Back Button -->
      <button
        (click)="goBack()"
        class="flex items-center gap-2 text-white hover:text-primary mb-6 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clip-rule="evenodd" />
        </svg>
        Back to Jobs
      </button>

      <!-- Job Header -->
      <div class="bg-primary/10 backdrop-blur-sm rounded-lg shadow-md p-6 mb-8 border border-[#004D40]/20">
        <div class="flex flex-col md:flex-row gap-6">
          <!-- Company Logo -->
          <div class="flex-shrink-0">
            <div class="size-24 rounded-lg bg-white flex items-center justify-center overflow-hidden">
              @if (job?.logo) {
                <img [src]="job?.logo" [alt]="(job?.company || 'Company') + ' logo'" class="object-contain size-20" />
              } @else {
                <div class="text-3xl font-bold text-primary">{{ job?.company ? job?.company?.charAt(0) : 'J' }}</div>
              }
            </div>
          </div>

          <!-- Job Info -->
          <div class="flex-grow">
            <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">{{ job?.title }}</h1>
            <div class="text-xl text-gray-300 mb-4">{{ job?.company }}</div>

            <div class="flex flex-wrap gap-3 mb-4">
              <div class="flex items-center gap-1 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span>{{ job?.location }}</span>
              </div>

              <div class="flex items-center gap-1 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                <span>{{ job?.domain }}</span>
              </div>

              <div class="flex items-center gap-1 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
                </svg>
                <span>{{ job?.jobType }}</span>
              </div>

              <div class="flex items-center gap-1 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                <span>{{ job?.salary }}</span>
              </div>

              <div class="flex items-center gap-1 text-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd" />
                </svg>
                <span>Posted {{ job?.postedTime }}</span>
              </div>
            </div>

            <!-- Apply Button -->
            <button class="bg-[#2A9D8F] hover:bg-[#238379] text-white font-medium py-2 px-6 rounded-md transition-colors">
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Job Details -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Job Description -->
          <div class="bg-primary/5 backdrop-blur-sm rounded-lg shadow-md p-6 border border-[#004D40]/10">
            <h2 class="text-xl font-semibold mb-4 text-white">Job Description</h2>
            <div class="text-gray-300 space-y-4">
              <p>{{ job?.description }}</p>
            </div>
          </div>

          <!-- Responsibilities -->
          <div class="bg-primary/5 backdrop-blur-sm rounded-lg shadow-md p-6 border border-[#004D40]/10">
            <h2 class="text-xl font-semibold mb-4 text-white">Responsibilities</h2>
            <ul class="list-disc pl-5 text-gray-300 space-y-2">
              @for (item of job?.responsibilities; track $index) {
                <li>{{ item }}</li>
              }
            </ul>
          </div>

          <!-- Requirements -->
          <div class="bg-primary/5 backdrop-blur-sm rounded-lg shadow-md p-6 border border-[#004D40]/10">
            <h2 class="text-xl font-semibold mb-4 text-white">Requirements</h2>
            <ul class="list-disc pl-5 text-gray-300 space-y-2">
              @for (item of job?.requirements; track $index) {
                <li>{{ item }}</li>
              }
            </ul>
          </div>

          <!-- Benefits -->
          <div class="bg-primary/5 backdrop-blur-sm rounded-lg shadow-md p-6 border border-[#004D40]/10">
            <h2 class="text-xl font-semibold mb-4 text-white">Benefits</h2>
            <ul class="list-disc pl-5 text-gray-300 space-y-2">
              @for (item of job?.benefits; track $index) {
                <li>{{ item }}</li>
              }
            </ul>
          </div>
        </div>

        <!-- Right Column - Company Info & Application -->
        <div class="space-y-8">
          <!-- Company Info -->
          <div class="bg-primary/5 backdrop-blur-sm rounded-lg shadow-md p-6 border border-[#004D40]/10">
            <h2 class="text-xl font-semibold mb-4 text-white">About {{ job?.company }}</h2>
            <div class="text-gray-300 space-y-4">
              <p>{{ job?.companyDescription }}</p>

              <div class="pt-4 space-y-3">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span>Company Size: {{ job?.companySize }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd" />
                  </svg>
                  <span>Industry: {{ job?.companyIndustry }}</span>
                </div>

                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
                  </svg>
                  <a href="{{ job?.companyWebsite }}" target="_blank" class="text-primary hover:underline">
                    Company Website
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Application Deadline -->
          <div class="bg-primary/5 backdrop-blur-sm rounded-lg shadow-md p-6 border border-[#004D40]/10">
            <h2 class="text-xl font-semibold mb-4 text-white">Application Deadline</h2>
            <div class="flex items-center gap-2 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
              </svg>
              <span>{{ job?.applicationDeadline }}</span>
            </div>
          </div>

          <!-- Similar Jobs -->
          <div class="bg-primary/5 backdrop-blur-sm rounded-lg shadow-md p-6 border border-[#004D40]/10">
            <h2 class="text-xl font-semibold mb-4 text-white">Similar Jobs</h2>
            <div class="space-y-4">
              <div class="flex items-center gap-3 p-3 rounded-md hover:bg-primary/10 transition-colors cursor-pointer">
                <div class="size-10 rounded-md bg-white flex items-center justify-center overflow-hidden">
                  <div class="text-lg font-bold text-primary">T</div>
                </div>
                <div>
                  <h3 class="text-white font-medium">Frontend Developer</h3>
                  <div class="text-sm text-gray-400">TechCorp • Remote</div>
                </div>
              </div>

              <div class="flex items-center gap-3 p-3 rounded-md hover:bg-primary/10 transition-colors cursor-pointer">
                <div class="size-10 rounded-md bg-white flex items-center justify-center overflow-hidden">
                  <div class="text-lg font-bold text-primary">I</div>
                </div>
                <div>
                  <h3 class="text-white font-medium">UI/UX Designer</h3>
                  <div class="text-sm text-gray-400">Innovate Tech • San Francisco</div>
                </div>
              </div>

              <div class="flex items-center gap-3 p-3 rounded-md hover:bg-primary/10 transition-colors cursor-pointer">
                <div class="size-10 rounded-md bg-white flex items-center justify-center overflow-hidden">
                  <div class="text-lg font-bold text-primary">C</div>
                </div>
                <div>
                  <h3 class="text-white font-medium">Full Stack Developer</h3>
                  <div class="text-sm text-gray-400">Cloud Systems • New York</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class JobDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  jobId: string | null = null;
  job: JobDetail | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.jobId = params.get('id');
      this.loadJobDetails();
    });
  }

  loadJobDetails() {
    if (this.jobId === '1') {
      this.job = {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Solutions',
        location: 'Remote',
        domain: 'Technology',
        salary: '$120k - $150k',
        postedTime: '2 hours ago',
        jobType: 'Full-time',
        description: 'We are looking for a Senior Frontend Developer to join our team and help us build amazing user experiences. The ideal candidate will have a strong background in modern frontend technologies and a passion for creating intuitive, responsive web applications.',
        responsibilities: [
          'Develop new user-facing features using React.js and modern frontend technologies',
          'Build reusable components and libraries for future use',
          'Translate designs and wireframes into high-quality code',
          'Optimize components for maximum performance across a vast array of web-capable devices and browsers',
          'Collaborate with back-end developers and designers to improve usability',
          'Participate in code reviews and mentor junior developers'
        ],
        requirements: [
          '5+ years of experience in frontend development',
          'Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model',
          'Thorough understanding of React.js and its core principles',
          'Experience with popular React.js workflows (such as Redux)',
          'Familiarity with RESTful APIs and modern authorization mechanisms',
          'Good understanding of server-side rendering and its benefits',
          'Experience with common frontend development tools such as Babel, Webpack, NPM, etc.',
          'Familiarity with code versioning tools such as Git'
        ],
        benefits: [
          'Competitive salary and equity package',
          'Health, dental, and vision insurance',
          'Flexible work hours and remote work options',
          'Generous paid time off',
          'Professional development budget',
          'Home office stipend',
          '401(k) matching',
          'Regular team events and retreats'
        ],
        companyDescription: 'TechCorp Solutions is a leading technology company specializing in building innovative web applications for enterprise clients. We are a team of passionate developers, designers, and product managers who are committed to creating exceptional digital experiences.',
        companySize: '50-100 employees',
        companyIndustry: 'Software Development',
        companyWebsite: 'https://techcorp-solutions.example.com',
        applicationDeadline: 'June 30, 2025'
      };
    } else {
      this.job = {
        id: this.jobId || '0',
        title: 'Software Developer',
        company: 'Example Company',
        location: 'New York, NY',
        domain: 'Technology',
        salary: '$100k - $130k',
        postedTime: '1 day ago',
        jobType: 'Full-time',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.',
        responsibilities: [
          'Develop and maintain software applications',
          'Collaborate with cross-functional teams',
          'Write clean, maintainable code',
          'Participate in code reviews'
        ],
        requirements: [
          'Bachelor\'s degree in Computer Science or related field',
          '3+ years of experience in software development',
          'Proficiency in one or more programming languages',
          'Experience with software development methodologies'
        ],
        benefits: [
          'Competitive salary',
          'Health insurance',
          'Flexible work hours',
          'Professional development opportunities'
        ],
        companyDescription: 'Example Company is a technology company that specializes in developing innovative software solutions for businesses of all sizes.',
        companySize: '100-500 employees',
        companyIndustry: 'Technology',
        companyWebsite: 'https://example.com',
        applicationDeadline: 'May 31, 2025'
      };
    }
  }

  goBack() {
    this.router.navigate(['/jobs']);
  }
}
