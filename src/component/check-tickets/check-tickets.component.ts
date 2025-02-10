import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AsyncPipe, NgIf} from '@angular/common';
import {Observable} from 'rxjs';
import {AuthService} from '../../app/services/auth.service';

@Component({
  selector: 'app-check-tickets',
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './check-tickets.component.html'
})
export class CheckTicketsComponent {
  showCartDropdown = false;
  isLoading = true;

  toggleCartDropdown() {
    this.showCartDropdown = !this.showCartDropdown;
  }

  closeDropdown(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('#cartDropdown') && !clickedElement.closest('#toggleCart')) {
      this.showCartDropdown = false;
    }
  }

  isLoggedIn!: Observable<boolean>; // Estado de autenticación

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated(); // Obtenemos el estado de autenticación
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
