import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../app/services/auth.service';
import { BookingService } from '../../app/services/booking.service';
import { TripService } from '../../app/services/trip.service';
import { ButtonModule } from 'primeng/button';

/**
 * Componente que permite al usuario revisar sus reservas pendientes,
 * con la opción de eliminarlas, ver detalles del viaje y calcular el total de las reservas.
 *
 * @example
 * <app-check-tickets></app-check-tickets>
 */
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
  /**
   * Determina si el menú desplegable de reservas está visible.
   */
  showCartDropdown = false;

  /**
   * Indica si los datos están cargando.
   */
  isLoading = true;

  /**
   * Observable que indica si el usuario está autenticado.
   */
  isLoggedIn!: Observable<boolean>;

  /**
   * Lista de reservas pendientes del usuario.
   */
  pendingReservations: any[] = [];

  /**
   * ID del usuario autenticado.
   */
  userId!: number | null;

  /**
   * Constructor que inyecta los servicios necesarios.
   *
   * @param authService Servicio que gestiona la autenticación.
   * @param bookingService Servicio que gestiona las reservas.
   * @param tripService Servicio que gestiona los viajes.
   * @param cdr
   */
  constructor(
    private authService: AuthService,
    private bookingService: BookingService,
    private tripService: TripService,
    private cdr: ChangeDetectorRef) {}

  /**
   * Método de inicialización del componente. Verifica si el usuario está autenticado,
   * obtiene su ID y carga las reservas pendientes si es necesario.
   */
  ngOnInit() {
    // Verifica si el usuario está autenticado
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

    // Simula el proceso de carga
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  /**
   * Alterna la visibilidad del menú desplegable de reservas.
   */
  toggleCartDropdown() {
    this.showCartDropdown = !this.showCartDropdown;
  }

  /**
   * Cierra el menú desplegable si se hace clic fuera del área del carrito.
   *
   * @param event Evento de clic.
   */
  closeDropdown(event: Event) {
    const clickedElement = event.target as HTMLElement;

    // Si el clic no está dentro del dropdown ni del botón de toggle
    if (!clickedElement.closest('#cartDropdown') && !clickedElement.closest('#toggleCart')) {
      this.showCartDropdown = false;
    }
  }

  /**
   * Carga las reservas pendientes del usuario.
   * Obtiene las reservas pendientes y, para cada una, obtiene los detalles del viaje asociado.
   */
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

  /**
   * Elimina una reserva pendiente.
   *
   * @param reservationId ID de la reserva que se desea eliminar.
   */
  deleteReservation(reservationId: number) {
    this.bookingService.deleteReservation(reservationId).subscribe({
      next: () => {
        // Filtramos la reserva eliminada
        this.pendingReservations = this.pendingReservations.filter(res => res.id !== reservationId);

        // Forzar la detección de cambios
        this.cdr.detectChanges();  // Forzar la actualización de la vista
      },
      error: () => {
        console.error('Error al eliminar la reserva');
      }
    });
  }

  /**
   * Calcula el precio total de todas las reservas pendientes.
   *
   * @returns El precio total de las reservas.
   */
  getTotalPrice(): number {
    return this.pendingReservations.reduce((acc, r) => acc + r.total_price, 0);
  }

}
