import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../component/header/header.component';
import { SearchbarComponent } from '../../../component/searchbar/searchbar.component';
import { CardComponent } from '../../../component/card/card.component';
import { Trip } from '../../model/trip';
import { TripService } from '../../services/trip.service';
import { NgForOf } from '@angular/common';

/**
 * @description
 * Componente principal de la página de inicio que muestra una lista de viajes.
 * Incluye un encabezado, una barra de búsqueda y una lista de tarjetas de viaje.
 *
 * @exports
 * - `MainPageComponent`: Componente que gestiona la visualización de los viajes.
 */
@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    HeaderComponent,
    SearchbarComponent,
    CardComponent,
    NgForOf
  ],
  templateUrl: './main-page.component.html'
})
export class MainPageComponent implements OnInit {
  /**
   * @description
   * Lista de viajes obtenidos desde el servicio de viajes.
   * Se utiliza para llenar las tarjetas de viaje en la interfaz de usuario.
   */
  trips: Trip[] = [];

  /**
   * @description
   * Constructor del componente, que inyecta el servicio `TripService` para obtener los viajes.
   *
   * @param tripService - Servicio que proporciona los viajes.
   */
  constructor(private tripService: TripService) { }

  /**
   * @description
   * Método del ciclo de vida de Angular que se llama al inicializar el componente.
   * Llama al método `loadTrips` para cargar los viajes al cargar la página.
   */
  ngOnInit() {
    this.loadTrips();
  }

  /**
   * @description
   * Carga los viajes utilizando el `TripService` y asigna los datos a la propiedad `trips`.
   * Se suscribe al observable proporcionado por el servicio para obtener los viajes.
   */
  loadTrips() {
    this.tripService.allTrips().subscribe(trips => this.trips = trips);
  }
}
