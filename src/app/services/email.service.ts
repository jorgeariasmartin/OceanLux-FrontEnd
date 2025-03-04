import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Servicio encargado de manejar el envío de correos electrónicos de verificación.
 *
 * Este servicio permite enviar un correo electrónico de verificación a un usuario dado su ID.
 *
 * @example
 * this.emailService.sendVerificationEmail(userId).subscribe(response => { ... });
 */
@Injectable({
  providedIn: 'root'
})
export class EmailService {
  /**
   * URL base de la API para el envío de correos electrónicos de verificación.
   * Debe ser modificada según la configuración del servidor.
   */
  private apiUrl = 'http://localhost:8000/api/send-verification-email';

  /**
   * Constructor que inyecta el servicio HttpClient utilizado para realizar solicitudes HTTP.
   *
   * @param http Servicio HttpClient para realizar las solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Método para enviar un correo electrónico de verificación al usuario.
   *
   * @param userId ID del usuario al que se le enviará el correo de verificación.
   * @returns Un observable que emite la respuesta del backend tras intentar enviar el correo de verificación.
   */
  sendVerificationEmail(userId: number): Observable<any> {
    return this.http.post(this.apiUrl, { user_id: userId }); // Enviamos el ID correcto del usuario
  }
}
