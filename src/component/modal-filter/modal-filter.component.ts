import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

/**
 * Componente ModalFilter para filtrar resultados mediante selección de modelos y precios.
 * Abre un modal donde el usuario puede aplicar filtros personalizados.
 */
@Component({
  selector: 'app-modal-filter',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf
  ],
  templateUrl: './modal-filter.component.html'
})
export class ModalFilterComponent {

  /**
   * Evento emitido cuando se aplican los filtros.
   * Devuelve un objeto con los modelos y precios seleccionados.
   */
  @Output() filtersApplied = new EventEmitter<{ models: string[], prices: string[] }>();

  /**
   * Evento emitido cuando se cambia el precio máximo.
   * Devuelve el nuevo precio máximo seleccionado.
   */
  @Output() priceChanged = new EventEmitter<number>();

  /**
   * Lista de modelos de yates disponibles para filtrar.
   */
  @Input() yachtModels: string[] | null = null;

  /**
   * Precio máximo inicial para el filtro.
   */
  @Input() maxPrice: number = 2000;

  /**
   * Estado de visibilidad del modal.
   */
  showModal = false;

  /**
   * Modelos seleccionados en el modal.
   */
  selectedModels: { [key: string]: boolean } = {};

  /**
   * Precios seleccionados en el modal.
   */
  selectedPrices: { [key: string]: boolean } = {};

  /**
   * Abre el modal de filtros.
   */
  openModal() {
    this.showModal = true;
  }

  /**
   * Cierra el modal de filtros.
   */
  closeModal() {
    this.showModal = false;
  }

  /**
   * Maneja el cambio del valor del precio máximo en el modal.
   * @param event Evento del input de precio máximo.
   */
  onPriceChange(event: any) {
    this.maxPrice = event.target.value;
    this.priceChanged.emit(this.maxPrice);
  }

  /**
   * Aplica los filtros seleccionados y emite el evento con los datos.
   */
  applyFilters() {
    const selectedModelsArray = Object.keys(this.selectedModels).filter(key => this.selectedModels[key]);
    const selectedPricesArray = Object.keys(this.selectedPrices).filter(key => this.selectedPrices[key]);

    this.filtersApplied.emit({ models: selectedModelsArray, prices: selectedPricesArray });
    this.closeModal();
  }
}
