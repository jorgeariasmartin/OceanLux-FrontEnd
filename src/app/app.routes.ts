import { Routes } from '@angular/router';
import {ViewAllTripsComponent} from './features/view-all-trips/view-all-trips.component';
import {HomeComponent} from './features/home/home.component';
import {YachtListComponent} from './features/yacht-list/yacht-list.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'trips', component: ViewAllTripsComponent },
  { path: 'yachts', component: YachtListComponent },  // Ruta por defecto o cualquier ruta que elijas

];
