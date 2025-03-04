import {Component, OnInit} from '@angular/core';
import {ToastModule} from 'primeng/toast';
import {HeaderComponent} from '../../../component/header/header.component';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {ReservationService} from '../../services/booking.service';
import {Button, ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-admin-booking',
  imports: [
    CommonModule,
    ToastModule,
    HeaderComponent,
    Button,
    TableModule,
    ButtonModule
  ],
  templateUrl: './admin-booking.component.html'
})
export class AdminBookingComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) {}


  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.reservationService.getAllReservations().subscribe(
      data => {
        this.reservations = data;
      },
      error => {
        console.error('Error fetching reservations', error);
      }
    );
  }

  editReservation(reservation: any) {
    console.log('Edit reservation', reservation);
  }

  deleteReservation(reservation: any) {
    console.log('Delete reservation', reservation);
  }

  customSort(event: any) {
    const field = event.field;
    const order = event.order;

    this.reservations.sort((a, b) => {
      let valueA = this.resolveFieldData(a, field);
      let valueB = this.resolveFieldData(b, field);

      if (typeof valueA === 'string') {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      return (valueA < valueB ? -1 : 1) * order;
    });
  }

  resolveFieldData(data: any, field: string): any {
    return field.split('.').reduce((obj, key) => obj?.[key], data);
  }

}
