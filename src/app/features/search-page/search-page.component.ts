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
  trips: Trip[] = [];
  allTrips: Trip[] = [];
  searchQuery: string = '';
  yachtModels: string[] = [];
  selectedModels: { [key: string]: boolean } = {};
  selectedPrices: { [key: string]: boolean } = {};
  maxPrice: number = 2000;

  constructor(private route: ActivatedRoute, private tripService: TripService) {}

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

  priceRanges = [
    { value: "250", label: "Hasta 250€" },
    { value: "500", label: "Hasta 500€" },
    { value: "1000", label: "Hasta 1000€" },
    { value: "2000", label: "Hasta 2000€" }
  ];

  extractYachtModels() {
    const modelsSet = new Set<string>();
    this.allTrips.forEach(trip => {
      if (trip.yacht?.model) {
        modelsSet.add(trip.yacht.model);
      }
    });
    this.yachtModels = Array.from(modelsSet);
    console.log("Modelos extraídos:", this.yachtModels);
  }

  onFilterChange() {
    console.log("Filtros cambiados", this.selectedModels, this.selectedPrices);
    this.applyFilters();
  }

  onPriceChanged(newMaxPrice: number) {
    this.maxPrice = newMaxPrice;
    this.applyFilters();
  }

  onSearch(query: string) {
    this.searchQuery = query.trim().toLowerCase();
    this.applyFilters();
  }

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

  onPriceChange(event: any) {
    this.maxPrice = event.target.value;
    this.applyFilters();
  }

  onFiltersApplied(filters: { models: string[], prices: string[] }) {
    this.selectedModels = {};
    this.selectedPrices = {};

    filters.models.forEach(model => this.selectedModels[model] = true);
    filters.prices.forEach(price => this.selectedPrices[price] = true);

    this.applyFilters();
  }
}
