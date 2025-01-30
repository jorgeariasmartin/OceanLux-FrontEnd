import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import {NgClass, NgIf} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('sidebarAnimation', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-out', style({transform: 'translateX(0)'})),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({transform: 'translateX(-100%)'})),
      ]),
    ]),
  ],
  imports: [
    NgIf,
    NgClass
  ],
  standalone: true
})
export class SidebarComponent {
  isSidebarOpen = false;
  isLoading = true;

  constructor() {
    // Simulate loading state
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
