import { Component, Input } from '@angular/core';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Trip } from '../../app/model/trip';

/**
 * Componente que representa una tarjeta con los detalles de un viaje.
 * Este componente permite visualizar información del viaje y determinar si la fecha del viaje ha pasado.
 *
 * @example
 * <app-card [trip]="trip" [shopped]="true"></app-card>
 */
@Component({
  selector: 'app-card',
  imports: [
    NgIf,
    RouterLink,
    DatePipe,
    NgClass
  ],
  templateUrl: './card.component.html'
})
export class CardComponent {
  /**
   * Propiedad de entrada que indica si el viaje ha sido comprado o no.
   *
   * @default false
   */
  @Input() shopped: boolean = false;

  /**
   * Propiedad de entrada que recibe un objeto `Trip` con los detalles del viaje.
   */
  @Input() trip!: Trip;

  /**
   * Método que verifica si la fecha del viaje ha pasado o no.
   *
   * @param dateString Fecha del viaje en formato de cadena.
   * @returns `true` si la fecha ha pasado, `false` si no.
   */
  isPastDate(dateString: string): boolean {
    const tripDate = new Date(dateString);
    const today = new Date();
    return tripDate < today;
  }
}
