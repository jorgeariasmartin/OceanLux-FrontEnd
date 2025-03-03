import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {CommonModule, NgIf} from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../app/services/auth.service';
import { BookingService } from '../../app/services/booking.service';
import {TripService} from '../../app/services/trip.service';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-check-tickets',
  imports: [
    NgIf,
    CommonModule,
    ButtonModule,
    RouterLink
  ],
  templateUrl: './check-tickets.component.html'
})
export class CheckTicketsComponent implements OnInit {
  showCartDropdown = false;
  isLoading = true;
  isLoggedIn!: Observable<boolean>;
  pendingReservations: any[] = [];
  userId!: number | null;

  constructor(private authService: AuthService, private bookingService: BookingService, private tripService : TripService) {}

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

        // Para cada reserva, obtener los datos del viaje asociado
        this.pendingReservations.forEach(reservation => {
          this.tripService.getTripById(reservation.trip_id).subscribe(trip => {
            reservation.trip = trip;
          });
        });
      },
      error: () => {
        console.error('Error al cargar las reservas pendientes');
      }
    });
  }

  deleteReservation(reservationId: number) {
    this.bookingService.deleteReservation(reservationId).subscribe({
      next: () => {
        this.pendingReservations = this.pendingReservations.filter(res => res.id !== reservationId);
      },
      error: () => {
        console.error('Error al eliminar la reserva');
      }
    });
  }

  getTotalPrice(): number {
    return this.pendingReservations.reduce((acc, r) => acc + r.total_price, 0);
  }

}
