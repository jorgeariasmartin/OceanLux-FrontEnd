import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule } from 'primeng/selectbutton';
import {NgClass, NgIf} from '@angular/common';
import { Password } from 'primeng/password';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { InputNumber } from 'primeng/inputnumber';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { User} from '../../model/User';
import { MessageService } from 'primeng/api';
import {Toast, ToastModule} from 'primeng/toast';

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
    HttpClientModule,
    NgClass,
    Toast,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './view-login-register.component.html',
})
export class ViewLoginRegisterComponent implements OnInit {

  stateOptions: any[] = [
    { label: 'Iniciar sesión', value: 'login' },
    { label: 'Registrarse', value: 'register' },
  ];


  userData = {
    username: '',
    password: '',
    email: '',
    client: {
      name: '',
      surname: '',
      birthdate: '',
      dni: '',
      address: '',
      phone_number: null
    }
  };

  emailValid: boolean | null = null;
  dniValid: boolean | null = null;
  birthdateValid: boolean | null = null;
  phoneValid: boolean | null = null;

  activeForm: string = 'login';
  user: User = { username: '', password: '' };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) {}

  ngOnInit() {}

  validatePhoneNumber() {
    const phoneRegex = /^[0-9]{9,15}$/;

    if (!this.userData.client.phone_number) {
      this.phoneValid = null;
      return;
    }

    this.phoneValid = phoneRegex.test(this.userData.client.phone_number);
  }

  validateEmail() {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailValid = emailPattern.test(this.userData.email);
  }

  validateDNI() {
    const dniPattern = /^[0-9]{8}[A-Za-z]$/;
    this.dniValid = dniPattern.test(this.userData.client.dni);
  }

  validateBirthdate() {
    if (!this.userData.client.birthdate) {
      this.birthdateValid = null;
      return;
    }

    const birthdate = new Date(this.userData.client.birthdate);
    const today = new Date();

    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      this.birthdateValid = age - 1 >= 18;
    } else {
      this.birthdateValid = age >= 18;
    }
  }

  register() {
    if (!this.userData.username || !this.userData.password || !this.userData.email ||
      !this.userData.client.name || !this.userData.client.surname ||
      !this.userData.client.birthdate || !this.userData.client.dni ||
      !this.userData.client.address || !this.userData.client.phone_number) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Completa todos los campos' });
      return;
    }

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Registro exitoso' });
        this.resetForm();
        this.activeForm = 'login';
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error en el registro' });

        this.userData.password = '';
      }
    });
  }

  resetForm() {
    this.userData = {
      username: '',
      password: '',
      email: '',
      client: {
        name: '',
        surname: '',
        birthdate: '',
        dni: '',
        address: '',
        phone_number: null
      }
    };
  }


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
