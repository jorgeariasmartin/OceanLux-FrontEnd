import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../component/header/header.component';
import { Checkbox } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Trip } from '../../model/trip';
import { TripService } from '../../services/trip.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import {LoadingComponent} from '../../../component/loading/loading.component';

@Component({
  selector: 'app-view-trip',
  standalone: true,
  imports: [
    HeaderComponent,
    Checkbox,
    FormsModule,
    InputNumber,
    ButtonModule,
    LoadingComponent
  ],
  templateUrl: './view-trip.component.html'
})
export class ViewTripComponent implements OnInit {
  trip!: Trip;
  tripId!: number;
  extra: string[] = [];
  value: number = 1;
  basePrice: number = 1000;
  maxTickets: number = 1;
  extrasPrices: { [key: string]: number } = {
    'Guia': 60,
    'Catering': 120,
    'Pepper': 150
  };
  totalPrice: number = this.basePrice;

  constructor(private tripService: TripService, private route: ActivatedRoute, private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.loadingOn();

    this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (isNaN(id) || id <= 0) {
          console.error("ID inválido del viaje");
          this.loadingService.loadingOff();
          return [];
        }
        this.tripId = id;
        return this.tripService.getTripById(this.tripId);
      })
    ).subscribe({
      next: (data) => {
        this.trip = data;
        this.basePrice = data.price || 1000;
        this.setMaxTickets();
        this.calculateTotal();
        this.loadingService.loadingOff();
      },
      error: (err) => {
        this.loadingService.loadingOff();
      }
    });
  }

  setMaxTickets() {
    if (this.trip?.yacht?.capacity) {
      this.maxTickets = this.trip.yacht.capacity > 25 ? Math.floor(this.trip.yacht.capacity * 0.25) : this.trip.yacht.capacity;
    }
  }

  calculateTotal() {
    let extrasCost = this.extra.reduce((acc, curr) => acc + (this.extrasPrices[curr] || 0), 0);
    this.totalPrice = this.basePrice * this.value + extrasCost;
  }
}
