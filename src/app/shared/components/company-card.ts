import { Component, input } from '@angular/core';
import { VisaCompany } from '../../pages/visa-companies/types/visa-company.type';

@Component({
  selector: 'app-company-card',
  template: `
    @let company = visaCompany();
    <div class="card h-full hover:shadow-lg transition-all duration-200">
      <div class="flex items-start gap-4">
        <div
          class="w-12 h-12 rounded bg-secondary-100 dark:bg-secondary-700 flex items-center justify-center">
          @if (company.logo) {
            <img
              [src]="company.logo"
              [alt]="company.name + ' logo'"
              class="object-contain w-8 h-8" />
          } @else {
            <span class="text-secondary-600 dark:text-secondary-300">{{
              company.name.charAt(0)
            }}</span>
          }
        </div>
        <div class="flex-1">
          <h3 class="font-semibold text-secondary-900 dark:text-white">
            {{ company.name }}
          </h3>

          <div class="flex flex-wrap gap-2 mt-2">
            @for (location of company.locations.slice(0, 2); track location) {
              <span
                class="text-sm px-2 py-1 rounded bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300">
                {{ location }}
              </span>
            }
            @if (company.locations.length > 2) {
              <span
                class="text-sm px-2 py-1 rounded bg-secondary-100 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-300">
                +{{ company.locations.length - 2 }} more
              </span>
            }
          </div>

          <div class="mt-3">
            <a
              [href]="company.careersUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-gray-900 rounded">
              <span>Careers</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 ml-1"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
 styles: [
],
})
export class CompanyCard {
  visaCompany = input.required<VisaCompany>();
}
