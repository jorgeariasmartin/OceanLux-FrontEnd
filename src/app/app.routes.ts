import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {ViewLoginRegisterComponent} from './features/view-login-register/view-login-register.component';
import {MainPageComponent} from './features/main-page/main-page.component';
import {SearchPageComponent} from './features/search-page/search-page.component';
import {ViewTripComponent} from './features/view-trip/view-trip.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: MainPageComponent},
  {path: 'search', component: SearchPageComponent},
  {path: 'logaccount', component: ViewLoginRegisterComponent },
  {path: 'trip/1', component: ViewTripComponent},
];
