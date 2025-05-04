import { Component, OnInit, inject, linkedSignal, resource, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VisaCompaniesFilter } from './visa-companies-filter';
import { LocationFilter } from './types/location-filter.type';
import { VisaCompany } from './types/visa-company.type';
import { CompanyCard } from '../../shared/components/company-card';



@Component({
  selector: 'app-visa-companies',
  imports: [CommonModule, FormsModule, VisaCompaniesFilter, CompanyCard],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white mb-2">
          Visa Sponsorship Companies
        </h1>
        <p class="text-gray-300">
          Find companies that sponsor work visas for international professionals
        </p>
      </div>
      <app-visa-companies-filter
        [allLocations]="allLocations()"
        (clear)="clearFilters()"
        [filters]="filters()"
        (onValueChange)="applyFilters($event)" />

      @if (companiesResource.isLoading()) {
        <div class="flex justify-center items-center py-12">
          <div
            class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      } @else if (companiesResource.error()) {
        <div class="bg-error/10 text-error-600 p-6 rounded-lg text-center">
          <h3 class="text-xl font-semibold mb-2">Error Loading Companies</h3>
          <p>{{ companiesResource.error() }}</p>
          <button
            class="mt-4 px-4 py-2 bg-error-600 text-white rounded-md hover:bg-error-700 transition-colors"
            (click)="companiesResource.reload()">
            Try Again
          </button>
        </div>
      } @else {
        <div class="mb-6 flex justify-between items-center">
          <h2 class="text-2xl font-bold text-primary">
            {{ filteredCompanies().length }} Companies Found
          </h2>
        </div>

        @if (filteredCompanies().length === 0) {
          <div
            class="bg-secondary-100 dark:bg-secondary-800 rounded-lg p-8 text-center">
            <h3
              class="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
              No Companies Found
            </h3>
            <p class="text-secondary-600 dark:text-secondary-400 mb-4">
              Try adjusting your filters or search criteria
            </p>
            <button
              class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-600 transition-colors"
              (click)="clearFilters()">
              Clear All Filters
            </button>
          </div>
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (company of displayedCompanies(); track company.id) {
              <app-company-card [visaCompany]="company" />
            }
          </div>

          @if (displayedCompanies().length < filteredCompanies().length) {
            <div class="mt-8 flex justify-center">
              <button
                class="px-6 py-3 bg-primary hover:bg-primary-600 text-white font-medium rounded-md transition-colors"
                (click)="loadMore()">
                Load More
              </button>
            </div>
          }
        }
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class VisaCompaniesComponent {

  allLocations = signal<string[]>([]);
  filters = signal<LocationFilter>({
    name: '',
    location: '',
  });
  displayLimit = signal(20);

  companiesResource = resource<VisaCompany[], unknown>({
    loader: async () => {
      const response = await fetch('/data/visa-companies.json');
      const data = await response.json();
      this.allLocations.set(Array.from(new Set(data.companies.flatMap((company: any) => company.locations))).sort() as string[]);
      return data.companies;
    }
  });

  filteredCompanies = linkedSignal<VisaCompany[]>(()=> this.companiesResource.value()!);
  displayedCompanies = linkedSignal<VisaCompany[]>(()=> this.filteredCompanies().slice(
    0,
    this.displayLimit()
  ))

  applyFilters(filters: LocationFilter) {
    this.filters.set(filters);
    this.filteredCompanies.set(this.companiesResource.value()!.filter(company => {
      const nameMatch =
        !this.filters()?.name ||
        company.name.toLowerCase().includes(this.filters()?.name.toLowerCase());

      const locationMatch =
        !this.filters()?.location ||
        company.locations.some(loc => loc === this.filters()?.location);

      return nameMatch && locationMatch;
    }));
  }

  clearFilters() {
    this.filters.set({
      name: '',
      location: '',
    });
    this.applyFilters(this.filters());
  }

  loadMore() {
    const currentLength = this.displayedCompanies().length;
    const newItems = this.filteredCompanies().slice(
      currentLength,
      currentLength + this.displayLimit()
    );
    this.displayedCompanies.update(val=> [...val, ...newItems]);
  }
}
