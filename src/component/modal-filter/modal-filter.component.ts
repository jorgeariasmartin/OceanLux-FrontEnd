import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';

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
export class ModalFilterComponent implements OnChanges {
  @Output() filtersApplied = new EventEmitter<{ models: string[], prices: string[] }>();
  @Output() priceChanged = new EventEmitter<number>(); // Emitir cambios de precio
  @Input() yachtModels: string[] | null = null;
  @Input() maxPrice: number = 2000; // Recibir maxPrice desde el padre

  showModal = false;
  selectedModels: { [key: string]: boolean } = {};
  selectedPrices: { [key: string]: boolean } = {};

  ngOnChanges(changes: SimpleChanges) {
    if (changes['yachtModels'] && this.yachtModels) {
      console.log("Nuevos modelos recibidos en el modal:", this.yachtModels);
    }
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  onPriceChange(event: any) {
    this.maxPrice = event.target.value;
    this.priceChanged.emit(this.maxPrice);
  }

  applyFilters() {
    const selectedModelsArray = Object.keys(this.selectedModels).filter(key => this.selectedModels[key]);
    const selectedPricesArray = Object.keys(this.selectedPrices).filter(key => this.selectedPrices[key]);

    this.filtersApplied.emit({ models: selectedModelsArray, prices: selectedPricesArray });
    this.closeModal();
  }
}
