import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../component/header/header.component';
import { SearchbarComponent } from '../../../component/searchbar/searchbar.component';
import { CardDetailsComponent } from '../../../component/card-details/card-details.component';
import { ModalFilterComponent } from '../../../component/modal-filter/modal-filter.component';
import { Trip } from '../../model/trip';
import { TripService } from '../../services/trip.service';
import { NgForOf, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

/**
 * @description
 * Componente de la página de búsqueda de viajes. Permite buscar, filtrar y ver detalles de los viajes basados en criterios como modelo de yate, precio y nombre.
 *
 * @exports
 * - `SearchPageComponent`: Componente que gestiona la búsqueda y filtrado de viajes en la interfaz de usuario.
 */
@Component({
  selector: 'app-search-page',
  imports: [
    HeaderComponent,
    SearchbarComponent,
    CardDetailsComponent,
    ModalFilterComponent,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent implements OnInit {
  /**
   * @description
   * Lista de viajes filtrados que se muestran en la interfaz de usuario.
   */
  trips: Trip[] = [];

  /**
   * @description
   * Lista completa de viajes que se obtienen del servicio `TripService`.
   * Esta lista se utiliza para aplicar los filtros y realizar la búsqueda.
   */
  allTrips: Trip[] = [];

  /**
   * @description
   * Consulta de búsqueda que se obtiene desde los parámetros de la URL o el formulario de búsqueda.
   */
  searchQuery: string = '';

  /**
   * @description
   * Modelos de yates disponibles para filtrar.
   */
  yachtModels: string[] = [];

  /**
   * @description
   * Diccionario de modelos seleccionados para el filtrado.
   * La clave es el modelo del yate, y el valor es un booleano que indica si está seleccionado o no.
   */
  selectedModels: { [key: string]: boolean } = {};

  /**
   * @description
   * Diccionario de rangos de precio seleccionados para el filtrado.
   * La clave es el rango de precio, y el valor es un booleano que indica si está seleccionado o no.
   */
  selectedPrices: { [key: string]: boolean } = {};

  /**
   * @description
   * Precio máximo seleccionado para filtrar los viajes por precio.
   */
  maxPrice: number = 2000;

  /**
   * @description
   * Constructor del componente, que inyecta el servicio `TripService` y el `ActivatedRoute` para obtener los viajes y los parámetros de la URL.
   *
   * @param route - Proporciona acceso a los parámetros de la ruta y a la consulta de búsqueda.
   * @param tripService - Servicio que obtiene los viajes disponibles.
   */
  constructor(private route: ActivatedRoute, private tripService: TripService) {}

  /**
   * @description
   * Método del ciclo de vida de Angular que se llama cuando el componente se inicializa.
   * Carga todos los viajes disponibles desde el servicio y extrae los modelos de yates.
   * Además, suscribe a los parámetros de consulta de la URL para realizar una búsqueda inicial si es necesario.
   */
  ngOnInit() {
    this.tripService.allTrips().subscribe(trips => {
      this.allTrips = trips;
      this.trips = trips;

      this.extractYachtModels();

      this.route.queryParams.subscribe(params => {
        if (params['query']) {
          this.onSearch(params['query']);
        }
      });
    });
  }

  /**
   * @description
   * Rango de precios disponibles para filtrar los viajes.
   */
  priceRanges = [
    { value: "250", label: "Hasta 250€" },
    { value: "500", label: "Hasta 500€" },
    { value: "1000", label: "Hasta 1000€" },
    { value: "2000", label: "Hasta 2000€" }
  ];

  /**
   * @description
   * Extrae los modelos de los yates de los viajes disponibles y los guarda en el array `yachtModels`.
   */
  extractYachtModels() {
    const modelsSet = new Set<string>();
    this.allTrips.forEach(trip => {
      if (trip.yacht?.model) {
        modelsSet.add(trip.yacht.model);
      }
    });
    this.yachtModels = Array.from(modelsSet);
  }

  /**
   * @description
   * Se llama cuando hay un cambio en los filtros de la página. Aplica los filtros a los viajes.
   */
  onFilterChange() {
    this.applyFilters();
  }

  /**
   * @description
   * Se llama cuando se cambia el precio máximo. Actualiza el filtro de precio y aplica los filtros.
   *
   * @param newMaxPrice - El nuevo precio máximo seleccionado.
   */
  onPriceChanged(newMaxPrice: number) {
    this.maxPrice = newMaxPrice;
    this.applyFilters();
  }

  /**
   * @description
   * Se llama cuando se realiza una búsqueda. Filtra los viajes según el texto de búsqueda.
   *
   * @param query - La cadena de texto de búsqueda.
   */
  onSearch(query: string) {
    this.searchQuery = query.trim().toLowerCase();
    this.applyFilters();
  }

  /**
   * @description
   * Aplica los filtros de búsqueda y precio a los viajes.
   * Actualiza la lista de `trips` con los viajes que cumplen con los criterios de búsqueda y filtro.
   */
  applyFilters() {
    this.trips = this.allTrips.filter(trip => {
      const matchesSearch = this.searchQuery === '' ||
        trip.departure.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        trip.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (trip.yacht?.name?.toLowerCase().includes(this.searchQuery.toLowerCase()));

      const selectedModelsArray = Object.keys(this.selectedModels).filter(key => this.selectedModels[key]);
      const matchesBoatType = selectedModelsArray.length === 0 ||
        selectedModelsArray.includes(trip.yacht?.model);

      const matchesPrice = this.maxPrice >= 2000 ? true : trip.price <= this.maxPrice;

      return matchesSearch && matchesBoatType && matchesPrice;
    });
  }

  /**
   * @description
   * Se llama cuando cambia el valor del filtro de precio a través de un control de entrada.
   *
   * @param event - El evento que contiene el nuevo valor del filtro de precio.
   */
  onPriceChange(event: any) {
    this.maxPrice = event.target.value;
    this.applyFilters();
  }

  /**
   * @description
   * Se llama cuando se aplican nuevos filtros desde el modal de filtros.
   * Actualiza los modelos y precios seleccionados y aplica los filtros.
   *
   * @param filters - Objeto que contiene los filtros aplicados por el usuario.
   * @param filters.models - Lista de modelos seleccionados.
   * @param filters.prices - Lista de precios seleccionados.
   */
  onFiltersApplied(filters: { models: string[], prices: string[] }) {
    this.selectedModels = {};
    this.selectedPrices = {};

    filters.models.forEach(model => this.selectedModels[model] = true);
    filters.prices.forEach(price => this.selectedPrices[price] = true);

    this.applyFilters();
  }
}
