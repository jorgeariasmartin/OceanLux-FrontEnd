import { Component } from '@angular/core';
import {HeaderComponent} from '../../../component/header/header.component';
import {SearchbarComponent} from '../../../component/searchbar/searchbar.component';
import {CardDetailsComponent} from '../../../component/card-details/card-details.component';
import {ModalFilterComponent} from '../../../component/modal-filter/modal-filter.component';
import {Trip} from '../../model/trip';
import {TripService} from '../../services/trip.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-search-page',
  imports: [
    HeaderComponent,
    SearchbarComponent,
    CardDetailsComponent,
    ModalFilterComponent,
    NgForOf
  ],
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent {
  trips: Trip[] = [];

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.allTrips().subscribe(trips => this.trips = trips);
  }

  loadTrips() {
    this.tripService.allTrips().subscribe(trips => this.trips = trips);
  }
}
