import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-view-login-register',
  standalone: true,
  imports: [RouterModule, SidebarComponent, FormsModule, SelectButtonModule, NgIf],
  templateUrl: './view-login-register.component.html',
})
export class ViewLoginRegisterComponent {
  stateOptions: any[] = [
    { label: 'Iniciar sesión', value: 'login' },
    { label: 'Registrarse', value: 'register' },
  ];

  activeForm: string = '';
}
