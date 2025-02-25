import { Component } from '@angular/core';
import {SidebarComponent} from '../../../component/sidebar/sidebar.component';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {BookingCardComponent} from '../../../component/booking-card/booking-card.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    SidebarComponent,
    ReactiveFormsModule,
    BookingCardComponent
  ],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{4} \d{4} \d{4} \d{4}$/)]],
      expDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvc: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      cardOwner: ['', Validators.required]
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
      console.log('Pago procesado:', this.paymentForm.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
