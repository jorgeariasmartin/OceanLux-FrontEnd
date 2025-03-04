import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../component/header/header.component';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Trip } from '../../model/trip';
import { TripService } from '../../services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { LoadingComponent } from '../../../component/loading/loading.component';
import { MessageService } from 'primeng/api';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';

/**
 * @description
 * Componente que gestiona la vista de un viaje individual, mostrando detalles del viaje y permitiendo a los usuarios realizar reservas.
 *
 * @exports
 * - `ViewTripComponent`: Componente que maneja la visualización y reserva de un viaje.
 */
@Component({
  selector: 'app-view-trip',
  standalone: true,
  imports: [
    HeaderComponent,
    Checkbox,
    FormsModule,
    InputNumber,
    ButtonModule,
    LoadingComponent
  ],
  templateUrl: './view-trip.component.html',
  providers: [MessageService]
})
export class ViewTripComponent implements OnInit {

  /**
   * @description
   * Viaje actual que se muestra en la vista. Se obtiene a través de una solicitud al servicio `TripService`.
   */
  trip!: Trip;

  /**
   * @description
   * ID del viaje actual extraído de los parámetros de la URL.
   */
  tripId!: number;

  /**
   * @description
   * Lista de extras seleccionados por el usuario para el viaje.
   */
  extra: string[] = [];

  /**
   * @description
   * Número de tickets seleccionados por el usuario para la reserva.
   */
  value: number = 1;

  /**
   * @description
   * Precio base del viaje, que puede ser modificado según el viaje.
   */
  basePrice: number = 1000;

  /**
   * @description
   * Número máximo de tickets disponibles para la reserva en base a la capacidad del yate.
   */
  maxTickets: number = 1;

  /**
   * @description
   * Precios de los extras disponibles para el viaje.
   */
  extrasPrices: { [key: string]: number } = {
    'Guia': 60,
    'Catering': 120,
    'Pepper': 150
  };

  /**
   * @description
   * Precio total del viaje, calculado según el número de tickets y los extras seleccionados.
   */
  totalPrice: number = this.basePrice;

  /**
   * @description
   * Estado que indica si la reserva está en proceso o no.
   */
  isBooking: boolean = false;

  /**
   * @description
   * Constructor que inyecta los servicios necesarios: `TripService`, `ActivatedRoute`, `LoadingService`, `BookingService`, `MessageService`, y `AuthService`.
   *
   * @param tripService - Servicio que gestiona los viajes.
   * @param route - Proporciona acceso a los parámetros de la ruta activa.
   * @param loadingService - Servicio para mostrar y ocultar la pantalla de carga.
   * @param bookingService - Servicio que gestiona las reservas de los viajes.
   * @param messageService - Servicio para mostrar mensajes emergentes.
   * @param authService - Servicio que gestiona la autenticación del usuario.
   */
  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private bookingService: BookingService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

  /**
   * @description
   * Método de inicialización del componente que obtiene los datos del viaje desde el servicio `TripService` basado en el ID extraído de los parámetros de la ruta.
   */
  ngOnInit() {
    this.loadingService.loadingOn();

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (isNaN(id) || id <= 0) {
          console.error("ID inválido del viaje");
          this.loadingService.loadingOff();
          return [];
        }
        this.tripId = id;
        return this.tripService.getTripById(this.tripId);
      })
    ).subscribe({
      next: (data) => {
        this.trip = data;
        this.basePrice = data.price || 1000;
        this.setMaxTickets();
        this.calculateTotal();
        this.loadingService.loadingOff();
      },
      error: () => {
        this.loadingService.loadingOff();
      }
    });
  }

  /**
   * @description
   * Establece el número máximo de tickets disponibles en base a la capacidad del yate. Si la capacidad es mayor a 25, se limita al 25% de la capacidad total.
   */
  setMaxTickets() {
    if (this.trip?.yacht?.capacity) {
      this.maxTickets = this.trip.yacht.capacity > 25 ? Math.floor(this.trip.yacht.capacity * 0.25) : this.trip.yacht.capacity;
    }
  }

  /**
   * @description
   * Calcula el precio total del viaje, teniendo en cuenta el número de tickets seleccionados y los extras.
   */
  calculateTotal() {
    let extrasCost = this.extra.reduce((acc, curr) => acc + (this.extrasPrices[curr] || 0), 0);
    this.totalPrice = this.basePrice * this.value + extrasCost;
  }

  /**
   * @description
   * Método que maneja la reserva del viaje. Verifica si el número de tickets no excede el máximo permitido y luego realiza la reserva llamando al servicio `BookingService`.
   *
   * @returns {void}
   */
  bookTrip() {
    if (this.value > this.maxTickets) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Número de tickets excede el máximo permitido' });
      return;
    }

    this.isBooking = true;

    // Obtén el user_id del AuthService
    this.authService.getUserId().subscribe({
      next: (userId) => {
        if (userId === null) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener el ID del usuario' });
          this.isBooking = false;
          return;
        }

        const reservation = {
          trip_id: this.tripId,
          number_of_guest: this.value,
          total_price: this.totalPrice,
          user_id: userId,
          booking_date: new Date().toISOString().split('T')[0]
        };

        // Llamamos al servicio para crear la reserva
        this.bookingService.createReservation(reservation).subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Añadido al carrito', detail: 'Tu viaje se ha añadido al carrito' });
            this.isBooking = false;
          },
          error: () => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error' });
            this.isBooking = false;
          }
        });
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo obtener el ID del usuario' });
        this.isBooking = false;
      }
    });
  }

}
