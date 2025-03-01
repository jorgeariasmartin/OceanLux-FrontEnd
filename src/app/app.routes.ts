import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {ViewLoginRegisterComponent} from './features/view-login-register/view-login-register.component';
import {AdminTripsComponent} from './features/admin-trips/admin-trips.component';
import {MainPageComponent} from './features/main-page/main-page.component';
import {SearchPageComponent} from './features/search-page/search-page.component';
import {ViewTripComponent} from './features/view-trip/view-trip.component';
import {AdminHomepageComponent} from './features/admin-homepage/admin-homepage.component';
import {AdminYachtsComponent} from './features/admin-yachts/admin-yachts.component';
import {ProfileComponent} from './features/profile/profile.component';
import {CheckoutComponent} from './features/checkout/checkout.component';
import { AdminRoleGuard } from './guards/admin-role.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'adminTrips', component: AdminTripsComponent},
  {path: 'logaccount', component: ViewLoginRegisterComponent},
  {path: 'home', component: MainPageComponent},
  {path: 'search', component: SearchPageComponent},
  { path: 'adminHome', component: AdminHomepageComponent, canActivate: [AdminRoleGuard] },
  {path:'adminYachts', component: AdminYachtsComponent},
  {path: 'trip/:id', component: ViewTripComponent},
  {path: 'adminHome', component: AdminHomepageComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'checkout', component: CheckoutComponent}
];
