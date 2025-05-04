import { Component, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocationFilter } from './types/location-filter.type';

@Component({
  selector: 'app-visa-companies-filter',
  imports: [FormsModule],
  template: `
    <div
      class="bg-primary/10 rounded-lg shadow-md p-6 mb-8 border border-[#004D40]/20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-white mb-1"
            >Company Name</label
          >
          <input
            type="text"
            class="w-full h-[42px] px-4 bg-white/90 rounded-md border-0 outline-none text-gray-700 placeholder-gray-500"
            placeholder="Search by company name"
            [(ngModel)]="filters().name"
            (input)="applyFilters()" />
        </div>

        <div>
          <label class="block text-sm font-medium text-white mb-1"
            >Location</label
          >
          <select
            class="w-full h-[42px] px-4 bg-white/90 rounded-md border-0 outline-none text-gray-700 appearance-none"
            [(ngModel)]="filters().location"
            (change)="applyFilters()">
            <option value="">All Locations</option>
            @for (location of allLocations(); track location) {
              <option [value]="location">{{ location }}</option>
            }
          </select>
        </div>

        <div class="flex items-end">
          <button
            class="w-full h-[42px] bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-md transition-colors"
            (click)="clearFilters()">
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  `,
})
export class VisaCompaniesFilter {
  filters = input.required<LocationFilter>();

  allLocations = input.required<string[]>();
  clear = output();
  onValueChange = output<LocationFilter>();

  applyFilters() {
    const filterValue = this.filters();
    this.onValueChange.emit(filterValue);
  }

  clearFilters() {
    this.clear.emit();
  }
}
