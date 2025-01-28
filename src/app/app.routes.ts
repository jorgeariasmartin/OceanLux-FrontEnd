import { Routes } from '@angular/router';
import {ViewAllTripsComponent} from './features/view-all-trips/view-all-trips.component';
import {HomeComponent} from './features/home/home.component';
import {ViewLoginRegisterComponent} from './features/view-login-register/view-login-register.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  { path: 'trips', component: ViewAllTripsComponent },
  { path: 'logaccount', component: ViewLoginRegisterComponent },
];
