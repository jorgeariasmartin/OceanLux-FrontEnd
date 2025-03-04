import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  processPayment(paymentData: any): Observable<{ success: boolean }> {
    const isSuccess = Math.random() > 0.2; // 80% de éxito
    return of({ success: isSuccess }).pipe(delay(2000)); // Simula tiempo de espera
  }
}
