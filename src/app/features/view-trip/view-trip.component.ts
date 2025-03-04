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
import {AuthService} from '../../services/auth.service';

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
  trip!: Trip;
  tripId!: number;
  extra: string[] = [];
  value: number = 1;
  basePrice: number = 1000;
  maxTickets: number = 1;
  extrasPrices: { [key: string]: number } = {
    'Guia': 60,
    'Catering': 120,
    'Pepper': 150
  };
  totalPrice: number = this.basePrice;
  isBooking: boolean = false;

  constructor(
    private tripService: TripService,
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private bookingService: BookingService,
    private messageService: MessageService,
    private authService: AuthService
  ) {}

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

  setMaxTickets() {
    if (this.trip?.yacht?.capacity) {
      this.maxTickets = this.trip.yacht.capacity > 25 ? Math.floor(this.trip.yacht.capacity * 0.25) : this.trip.yacht.capacity;
    }
  }

  calculateTotal() {
    let extrasCost = this.extra.reduce((acc, curr) => acc + (this.extrasPrices[curr] || 0), 0);
    this.totalPrice = this.basePrice * this.value + extrasCost;
  }

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
