import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de la verificación de correos electrónicos de usuarios.
 *
 * Este servicio permite verificar el correo electrónico de un usuario mediante un token.
 * El token se pasa como parámetro en la solicitud HTTP al backend para validar el correo electrónico.
 *
 * @example
 * this.verificationService.verifyEmail(token).subscribe(response => { ... });
 */
@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  /**
   * URL base de la API para la verificación de correo electrónico de un usuario.
   */
  private apiUrl = 'http://localhost:8000/api/user/verify';

  /**
   * Inyección del servicio `HttpClient` para realizar las peticiones HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Método para verificar el correo electrónico de un usuario utilizando un token.
   *
   * @param token El token de verificación enviado al correo del usuario.
   * @returns Un observable con la respuesta de la verificación.
   */
  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?token=${token}`);
  }
}
