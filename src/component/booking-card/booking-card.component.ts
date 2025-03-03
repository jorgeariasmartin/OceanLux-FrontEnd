import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-booking-card',
  imports: [
    DatePipe
  ],
  standalone: true,
  templateUrl: './booking-card.component.html'
})
export class BookingCardComponent {
  @Input() reservation: any;
  @Output() delete = new EventEmitter<number>();

  onDelete() {
    this.delete.emit(this.reservation.id); // Emitir el ID de la reserva al componente padre
  }
}
