import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {ViewLoginRegisterComponent} from './features/view-login-register/view-login-register.component';
import {MainPageComponent} from './features/main-page/main-page.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: MainPageComponent},
  { path: 'logaccount', component: ViewLoginRegisterComponent },
];
