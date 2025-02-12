import { Component } from '@angular/core';
import {HeaderComponent} from '../../../component/header/header.component';
import {SearchbarComponent} from '../../../component/searchbar/searchbar.component';
import {CardDetailsComponent} from '../../../component/card-details/card-details.component';
import {ModalFilterComponent} from '../../../component/modal-filter/modal-filter.component';
import {Trip} from '../../model/trip';
import {TripService} from '../../services/trip.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [
    HeaderComponent,
    SearchbarComponent,
    CardDetailsComponent,
    ModalFilterComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent {
  trips: Trip[] = [];
  allTrips: Trip[] = [];
  searchQuery: string = '';

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.allTrips().subscribe(trips => {
      this.allTrips = trips;
      this.trips = trips;
    });
  }

  onSearch(query: string) {
    const normalizedQuery = query.trim().toLowerCase();
    this.searchQuery = query;

    this.trips = this.allTrips.filter(trip =>
      trip.departure.toLowerCase().includes(normalizedQuery) ||
      trip.name.toLowerCase().includes(normalizedQuery) ||
      (trip.yacht?.name?.toLowerCase().includes(normalizedQuery))
    );
  }
}
