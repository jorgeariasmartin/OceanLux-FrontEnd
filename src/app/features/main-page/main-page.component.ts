import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../component/header/header.component';
import {SearchbarComponent} from '../../../component/searchbar/searchbar.component';
import {CardComponent} from '../../../component/card/card.component';
import {Trip} from '../../model/trip';
import {TripService} from '../../services/trip.service';
import {NgForOf} from '@angular/common';

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
  trips: Trip[] = [];

  constructor(private tripService: TripService) { }

  ngOnInit() {
    this.loadTrips()
  }

  loadTrips() {
    this.tripService.allTrips().subscribe(trips => this.trips = trips);
  }
}

