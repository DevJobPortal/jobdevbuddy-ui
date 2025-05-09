import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class HeaderComponent {
  mobileMenuOpen = signal(false);

  constructor() {}

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(val => !val);
  }
}
