import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../app/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  animations: [
    trigger('sidebarAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
  imports: [
    NgIf,
    NgClass,
    RouterLink,
    CommonModule,
    AsyncPipe
  ],
  standalone: true
})
export class SidebarComponent implements OnInit {
  isSidebarOpen = false;
  isLoading = true;
  isLoggedIn!: Observable<boolean>; // Estado de autenticación

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated(); // Obtenemos el estado de autenticación
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout() {
    this.authService.logout();
  }
}
