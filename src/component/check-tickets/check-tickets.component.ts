import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {AsyncPipe, CommonModule, NgIf} from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../app/services/auth.service';
import { ReservationService } from '../../app/services/booking.service';

@Component({
  selector: 'app-check-tickets',
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './check-tickets.component.html'
})
export class CheckTicketsComponent implements OnInit {
  showCartDropdown = false;
  isLoading = true;
  isLoggedIn!: Observable<boolean>;
  pendingReservations: any[] = [];
  userId!: number | null;

  constructor(private authService: AuthService, private bookingService: ReservationService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();

    // Obtener el ID del usuario autenticado
    this.authService.getUserId().subscribe({
      next: (id) => {
        this.userId = id;
        if (this.userId) {
          this.loadPendingReservations(); // Cargar reservas pendientes solo si el ID del usuario no es null
        }
      },
      error: () => {
        console.error('No se pudo obtener el ID del usuario.');
      }
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  toggleCartDropdown() {
    this.showCartDropdown = !this.showCartDropdown;
  }

  closeDropdown(event: Event) {
    const clickedElement = event.target as HTMLElement;
    if (!clickedElement.closest('#cartDropdown') && !clickedElement.closest('#toggleCart')) {
      this.showCartDropdown = false;
    }
  }

  loadPendingReservations() {
    if (!this.userId) return;

    this.bookingService.getPendingReservationsByUser(this.userId).subscribe({
      next: (reservations) => {
        this.pendingReservations = reservations;
        console.log(this.pendingReservations);
      },
      error: () => {
        console.error('Error al cargar las reservas pendientes');
      }
    });
  }


  getTotalPrice(): number {
    return this.pendingReservations.reduce((acc, r) => acc + r.total_price, 0);
  }

}
