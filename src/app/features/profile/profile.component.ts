import {Component, OnInit} from '@angular/core';
import { HeaderComponent } from '../../../component/header/header.component';
import { SearchbarComponent } from '../../../component/searchbar/searchbar.component';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import {DialogModule} from 'primeng/dialog';
import {FormsModule} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {BookingService} from '../../services/booking.service';
import {CardComponent} from '../../../component/card/card.component';

@Component({
  selector: 'app-profile',
  imports: [
    HeaderComponent,
    ButtonModule,
    CommonModule,
    DialogModule,
    FormsModule,
    InputText,
    ToastModule,
    CardComponent
  ],
  providers: [MessageService],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  user: any;
  displayModal: boolean = false;
  displayChangePasswordModal: boolean = false;
  editedUser: any = {};
  dniValid: boolean = true;
  phoneValid: boolean = true;
  emailValid: boolean = true;
  birthdateValid: boolean = true;
  errorMessage: string = '';
  changePasswordData: any = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
  passwordsMismatch: boolean = false;
  tripsBooked: any[] = [];

  constructor(private authService: AuthService, private messageService: MessageService, private bookingService: BookingService) {}

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (data) => {
        this.user = data;
        this.editedUser = { ...data };
        if (this.user?.id) {
          this.getTripsBooked();
        }
      },
      error: (error) => {
        console.error('Error obteniendo el usuario', error);
      }
    });
  }

  showModal(): void {
    this.displayModal = true;
  }

  hideModal(): void {
    this.displayModal = false;
  }

  validateForm(): boolean {
    let isValid = true;

    if (!this.validatePhoneNumber()) {
      isValid = false;
    }

    if (!this.validateEmail()) {
      isValid = false;
    }

    if (!this.validateBirthdate()) {
      isValid = false;
    }

    return isValid;
  }

  validatePhoneNumber(): boolean {
    const phonePattern = /^[0-9]{9,15}$/;
    this.phoneValid = phonePattern.test(this.editedUser.client.phone_number);
    return this.phoneValid;
  }

  validateEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.emailValid = emailPattern.test(this.editedUser.email);
    return this.emailValid;
  }

  validateBirthdate(): boolean {
    const today = new Date();
    const birthdate = new Date(this.editedUser.client.birthdate);
    const age = today.getFullYear() - birthdate.getFullYear();
    const m = today.getMonth() - birthdate.getMonth();
    const birthdateValid = age > 18 || (age === 18 && m >= 0);
    this.birthdateValid = birthdateValid;
    return birthdateValid;
  }

  getAvatarUrl(username: string): string {
    if (!username) {
      return `https://ui-avatars.com/api/?name=XX&background=0D8ABC&color=fff`;
    }
    const initials = username.substring(0, 2).toUpperCase();
    return `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff`;
  }

  saveChanges(): void {
    if (this.validateForm()) {
      this.authService.getAuthenticatedUser().subscribe({
        next: () => {
          this.authService.updateUser(this.editedUser).subscribe({
            next: (response) => {
              this.messageService.add({
                severity: 'success',
                summary: 'Éxito',
                detail: 'Usuario actualizado correctamente.',
              });
              console.log('User updated successfully:', response);
              this.displayModal = false;
            },
            error: (error) => {
              if (error.status === 400 && error.error.error === 'El nombre de usuario ya está en uso') {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'El nombre de usuario ya está en uso. Elige otro.',
                });
              } else {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Ocurrió un error al actualizar el usuario.',
                });
              }
              console.error('Error updating user:', error);
            },
          });
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo obtener la información del usuario.',
          });
          console.error('Error getting user:', error);
        },
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulario inválido',
        detail: 'Por favor, corrige los errores en el formulario antes de guardar.',
      });
    }
  }

// Mostrar el modal de cambiar contraseña
  showChangePasswordModal(): void {
    this.displayChangePasswordModal = true;
    this.changePasswordData = { oldPassword: '', newPassword: '', confirmPassword: '' };
    this.passwordsMismatch = false;
  }

  // Ocultar el modal de cambiar contraseña
  hideChangePasswordModal(): void {
    this.displayChangePasswordModal = false;
  }

  changePassword(): void {
    if (!this.validatePassWordForm()) {
      return;
    }

    const { oldPassword, newPassword, confirmPassword } = this.changePasswordData;

    this.authService.changePassword(oldPassword, newPassword, confirmPassword).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Contraseña cambiada',
          detail: 'Tu contraseña ha sido cambiada correctamente.',
        });
        this.hideChangePasswordModal();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Hubo un error al cambiar la contraseña.',
        });
        console.error('Error cambiando la contraseña:', error);
      }
    });
  }

  validatePassWordForm(): boolean {
    let isValid = true;

    if (this.changePasswordData.newPassword !== this.changePasswordData.confirmPassword) {
      isValid = false;
      this.passwordsMismatch = true;
    } else {
      this.passwordsMismatch = false;
    }

    return isValid;
  }

  getTripsBooked(): void {
    if (!this.user?.id) return;

    this.bookingService.getConfirmedReservations(this.user.id).subscribe({
      next: (trips) => {
        this.tripsBooked = trips;

        // Para cada reserva, obtener los detalles del trip asociado
        this.tripsBooked.forEach((booking, index) => {
          this.bookingService.getTripById(booking.trip_id).subscribe({
            next: (trip) => {
              this.tripsBooked[index].trip = trip; // Agregar el objeto trip a cada booking
            },
            error: (error) => {
              console.error(`Error obteniendo trip con ID ${booking.trip_id}:`, error);
            }
          });
        });
      },
      error: (error) => {
        console.error('Error obteniendo las reservas:', error);
      }
    });
  }
}
