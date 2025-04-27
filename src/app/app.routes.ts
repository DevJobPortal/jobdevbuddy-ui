import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'jobs',
    loadComponent: () => import('./pages/jobs/jobs.component').then(m => m.JobsComponent)
  },
  {
    path: 'jobs/:id',
    loadComponent: () => import('./pages/job-details/job-details.component').then(m => m.JobDetailsComponent)
  }
];
