import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent implements OnInit {
  isScrolled: any;
  constructor() {}
  mobileMenuOpen: boolean = false;
  ngOnInit() {}

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}
