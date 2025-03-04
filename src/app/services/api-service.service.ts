import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio encargado de realizar las solicitudes HTTP hacia la API de Symfony.
 * Este servicio proporciona métodos para obtener usuarios y crear nuevos usuarios.
 *
 * @example
 * const users = this.apiService.getUsers();
 * this.apiService.createUser(userData).subscribe(response => { ... });
 */
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  /**
   * URL base de la API. Debe ser cambiada según la configuración del servidor de backend.
   */
  private apiUrl = 'http://localhost:8000/api'; // Cambia según la URL de Symfony

  /**
   * Constructor que inyecta el servicio HttpClient para realizar solicitudes HTTP.
   *
   * @param http Servicio HttpClient utilizado para realizar solicitudes HTTP.
   */
  constructor(private http: HttpClient) {}

  /**
   * Método que obtiene la lista de usuarios desde la API.
   *
   * @returns Un observable que emite la lista de usuarios.
   */
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  /**
   * Método que crea un nuevo usuario en la API.
   *
   * @param userData Datos del usuario que se desea crear.
   * @returns Un observable que emite la respuesta de la API tras la creación del usuario.
   */
  createUser(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/users`, userData, { headers });
  }
}
