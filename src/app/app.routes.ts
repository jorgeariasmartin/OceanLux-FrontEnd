import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {ViewLoginRegisterComponent} from './features/view-login-register/view-login-register.component';
import {AdminTripsComponent} from './features/admin-trips/admin-trips.component';
import {MainPageComponent} from './features/main-page/main-page.component';
import {SearchPageComponent} from './features/search-page/search-page.component';
import {ViewTripComponent} from './features/view-trip/view-trip.component';
import {AdminHomepageComponent} from './features/admin-homepage/admin-homepage.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'adminTrips', component: AdminTripsComponent},
  {path: 'logaccount', component: ViewLoginRegisterComponent},
  {path: 'home', component: MainPageComponent},
  {path: 'search', component: SearchPageComponent},
  {path: 'trip/1', component: ViewTripComponent},
  {path:'adminHome', component: AdminHomepageComponent}
];
