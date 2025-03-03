import {Component, OnInit, ViewChild} from '@angular/core';
import {SidebarComponent} from '../../../component/sidebar/sidebar.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BookingCardComponent} from '../../../component/booking-card/booking-card.component';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {BookingService} from '../../services/booking.service';
import {TripService} from '../../services/trip.service';
import {NgForOf} from '@angular/common';
import { ToastComponent } from '../../../component/toast/toast.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    SidebarComponent,
    ReactiveFormsModule,
    BookingCardComponent,
    NgForOf,
    ToastComponent
  ],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  @ViewChild(ToastComponent) toast!: ToastComponent;

  paymentForm: FormGroup;
  isLoggedIn!: Observable<boolean>;
  pendingReservations: any[] = [];
  userId!: number | null;
  isLoading = true;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private bookingService: BookingService, private tripService: TripService) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      expDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      cardOwner: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.getUserId().subscribe({
      next: (id) => {
        this.userId = id;
        if (this.userId) {
          this.loadPendingReservations();
        }
      },
      error: () => console.error('No se pudo obtener el ID del usuario.')
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  deleteReservation(reservationId: number) {
    this.bookingService.deleteReservation(reservationId).subscribe({
      next: () => {
        this.pendingReservations = this.pendingReservations.filter(res => res.id !== reservationId);
      },
      error: () => {
        console.error('Error al eliminar la reserva');
      }
    });
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\D/g, '').slice(0, 16);
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    this.paymentForm.patchValue({ cardNumber: value }, { emitEvent: false });
  }

  formatExpDate(event: any) {
    let value = event.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    this.paymentForm.patchValue({ expDate: value }, { emitEvent: false });
  }

  formatCVC(event: any) {
    let value = event.target.value.replace(/\D/g, '').slice(0, 3);
    this.paymentForm.patchValue({ cvc: value }, { emitEvent: false });
  }


  submitForm() {
    if (this.paymentForm.valid) {
      this.toast.addMessage('info', 'Procesando pago', 'Por favor, espera...');

      setTimeout(() => {
        const success = Math.random() > 0.3; // Simulación: 70% éxito, 30% error
        if (success) {
          this.toast.addMessage('success', 'Pago Exitoso', 'Tu pago ha sido procesado correctamente.');
          this.updateReservationStatus();
          this.paymentForm.reset();

          setTimeout(() => {
            this.router.navigate(['/profile']); // <-- Redirige a /profile después del pago exitoso
          }, 1500); // Pequeño delay para mostrar el mensaje
        } else {
          this.toast.addMessage('error', 'Error en el pago', 'No se pudo procesar el pago. Inténtalo de nuevo.');
        }
      }, 2000);

    } else {
      this.toast.addMessage('warn', 'Formulario Inválido', 'Revisa los datos ingresados.');
    }
  }

  updateReservationStatus() {
    if (!this.pendingReservations.length) return;

    this.pendingReservations.forEach(reservation => {
      this.bookingService.updateReservationStatus(reservation.id, 1).subscribe({
        next: () => {
          reservation.status = 1; // Actualizar en frontend
        },
        error: (err) => {
          console.error('Error actualizando reserva:', err);
          this.toast.addMessage('error', 'Error', 'No se pudo actualizar el estado de la reserva.');
        }
      });
    });
  }




  loadPendingReservations() {
    if (!this.userId) return;

    this.bookingService.getPendingReservationsByUser(this.userId).subscribe({
      next: (reservations) => {
        this.pendingReservations = reservations;

        // Para cada reserva, obtener los datos del viaje asociado
        this.pendingReservations.forEach(reservation => {
          this.tripService.getTripById(reservation.trip_id).subscribe(trip => {
            reservation.trip = trip;
          });
        });
      },
      error: () => {
        console.error('Error al cargar las reservas pendientes');
      }
    });
  }
}
