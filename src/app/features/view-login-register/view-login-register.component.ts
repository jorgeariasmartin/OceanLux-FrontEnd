import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import { NgIf } from '@angular/common';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { User} from '../../model/User';

@Component({
  selector: 'app-view-login-register',
  standalone: true,
  imports: [
    RouterModule,
    SidebarComponent,
    FormsModule,
    SelectButtonModule,
    NgIf,
    Password,
    Button,
    InputText,
    InputNumber,
    HttpClientModule
  ],
  templateUrl: './view-login-register.component.html',
})
export class ViewLoginRegisterComponent implements OnInit {

  stateOptions: any[] = [
    { label: 'Iniciar sesión', value: 'login' },
    { label: 'Registrarse', value: 'register' },
  ];

  activeForm: string = 'login';
  user: User = { username: '', password: '' }; // Usamos la interfaz User
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    if (!this.user.username || !this.user.password) {
      this.errorMessage = 'Por favor, completa todos los campos.';
      return;
    }

    this.authService.login(this.user).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.router.navigate(['/']); // Redirigir a la página de inicio
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.errorMessage = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}
