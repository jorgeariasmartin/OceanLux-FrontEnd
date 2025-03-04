import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

/**
 * Componente que muestra la información de una reserva en formato de tarjeta.
 * Este componente permite eliminar una reserva mediante un evento emitido al componente padre.
 *
 * @example
 * <app-booking-card [reservation]="reservation" (delete)="onDelete($event)"></app-booking-card>
 */
@Component({
  selector: 'app-booking-card',
  imports: [
    DatePipe
  ],
  standalone: true,
  templateUrl: './booking-card.component.html'
})
export class BookingCardComponent {
  /**
   * Propiedad de entrada que recibe un objeto con los detalles de la reserva.
   */
  @Input() reservation: any;

  /**
   * Evento de salida que emite el ID de la reserva cuando se desea eliminar.
   */
  @Output() delete = new EventEmitter<number>();

  /**
   * Método que emite el ID de la reserva cuando se invoca la acción de eliminar.
   */
  onDelete() {
    this.delete.emit(this.reservation.id); // Emitir el ID de la reserva al componente padre
  }
}
