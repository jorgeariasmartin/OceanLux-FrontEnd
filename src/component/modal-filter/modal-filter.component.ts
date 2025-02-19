import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

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
  @Input() yachtModels: string[] | null = null;

  showModal = false;
  selectedModels: { [key: string]: boolean } = {};
  selectedPrices: { [key: string]: boolean } = {};

  priceRanges = [
    { value: "250", label: "Hasta 250€" },
    { value: "500", label: "Hasta 500€" },
    { value: "1000", label: "Hasta 1000€" },
    { value: "2000", label: "Hasta 2000€" }
  ];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['yachtModels'] && this.yachtModels) {
      console.log("Nuevos modelos recibidos en el modal:", this.yachtModels);
    }
  }

  openModal() {
    this.showModal = true;
    console.log("Modelos en el modal al abrir:", this.yachtModels); // Verificar si llegan los datos
  }

  closeModal() {
    this.showModal = false;
  }

  applyFilters() {
    const selectedModelsArray = Object.keys(this.selectedModels).filter(key => this.selectedModels[key]);
    const selectedPricesArray = Object.keys(this.selectedPrices).filter(key => this.selectedPrices[key]);

    this.filtersApplied.emit({ models: selectedModelsArray, prices: selectedPricesArray });
    this.closeModal();
  }
}
