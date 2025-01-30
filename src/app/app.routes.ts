import { Routes } from '@angular/router';
import {ViewAllTripsComponent} from './features/view-all-trips/view-all-trips.component';
import {HomeComponent} from './features/home/home.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'trips', component: ViewAllTripsComponent },
];
