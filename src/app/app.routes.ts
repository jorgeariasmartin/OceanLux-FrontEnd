import { Routes } from '@angular/router';
import {HomeComponent} from './features/home/home.component';
import {ViewLoginRegisterComponent} from './features/view-login-register/view-login-register.component';
import {YachtListComponent} from './features/yacht-list/yacht-list.component';
import {MainPageComponent} from './features/main-page/main-page.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: MainPageComponent},
  { path: 'yachts', component: YachtListComponent },  // Ruta por defecto o cualquier ruta que elijas
  { path: 'logaccount', component: ViewLoginRegisterComponent },
];
