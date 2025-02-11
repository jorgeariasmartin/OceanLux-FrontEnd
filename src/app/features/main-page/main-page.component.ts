import { Component } from '@angular/core';
import {HeaderComponent} from '../../../component/header/header.component';
import {SearchbarComponent} from '../../../component/searchbar/searchbar.component';
import {CardComponent} from '../../../component/card/card.component';
import {Trip} from '../../model/trip';
import {TripService} from '../../services/trip.service';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderComponent,
    SearchbarComponent,
    CardComponent,
    NgForOf
  ],
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {
  trips: Trip[] = [];

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.tripService.allTrips().subscribe(trips => this.trips = trips);
  }

  loadTrips() {
    this.tripService.allTrips().subscribe(trips => this.trips = trips);
  }
}
