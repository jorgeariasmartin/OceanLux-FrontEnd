import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Yacht } from '../model/yacht';

/**
 * Servicio encargado de gestionar las operaciones relacionadas con los yates.
 *
 * Este servicio proporciona métodos para crear, obtener, actualizar y eliminar yates
 * a través de la API. Las operaciones se realizan mediante peticiones HTTP.
 *
 * @example
 * this.yachtService.createYacht(newYacht).subscribe(response => { ... });
 */
@Injectable({
  providedIn: 'root'
})
export class YachtService {

  /**
   * URL base de la API para las operaciones relacionadas con los yates.
   */
  private apiUrl = 'http://localhost:8000/api/yacht';

  /**
   * Constructor del servicio que inyecta el servicio `HttpClient` para realizar
   * las peticiones HTTP a la API.
   *
   * @param http Servicio `HttpClient` para realizar peticiones HTTP.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método para crear un nuevo yate.
   *
   * @param yacht Objeto que representa el yate a crear.
   * @returns Un observable que emite el yate creado.
   */
  createYacht(yacht: Yacht): Observable<Yacht> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Yacht>(`${this.apiUrl}/create`, yacht, { headers });
  }

  /**
   * Método para obtener la lista de todos los yates.
   *
   * @returns Un observable que emite un array de yates.
   */
  getYachts(): Observable<Yacht[]> {
    return this.http.get<Yacht[]>(`${this.apiUrl}/all`);
  }

  /**
   * Método para eliminar un yate por su ID.
   *
   * @param id ID del yate a eliminar.
   * @returns Un observable que emite el yate eliminado.
   */
  deleteYacht(id: number): Observable<Yacht> {
    return this.http.delete<Yacht>(`${this.apiUrl}/delete/${id}`);
  }

  /**
   * Método para actualizar un yate.
   *
   * @param id ID del yate a actualizar.
   * @param yacht Objeto con los nuevos datos del yate.
   * @returns Un observable que emite el yate actualizado.
   */
  updateYacht(id: number, yacht: Yacht): Observable<Yacht> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<Yacht>(`${this.apiUrl}/update/${id}`, yacht, { headers });
  }
}
