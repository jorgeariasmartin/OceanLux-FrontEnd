import { Component, Input } from '@angular/core';
import { Trip } from '../../app/model/trip';
import { RouterLink } from '@angular/router';

/**
 * Componente que muestra los detalles de un viaje en formato de tarjeta.
 * Este componente recibe un objeto `Trip` como entrada y lo muestra en la interfaz.
 *
 * @example
 * <app-card-details [trip]="trip"></app-card-details>
 */
@Component({
  selector: 'app-card-details',
  imports: [
    RouterLink
  ],
  templateUrl: './card-details.component.html'
})
export class CardDetailsComponent {
  /**
   * Propiedad de entrada que recibe un objeto `Trip` para mostrar sus detalles.
   */
  @Input() trip!: Trip;
}
