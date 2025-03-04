import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../model/trip';

/**
 * Servicio encargado de gestionar las operaciones relacionadas con los viajes.
 *
 * Este servicio proporciona métodos para crear, obtener, actualizar y eliminar viajes
 * utilizando la API en el backend. Además, permite obtener todos los viajes disponibles.
 *
 * @example
 * this.tripService.createTrip(newTrip).subscribe(response => { ... });
 * this.tripService.getTripById(1).subscribe(response => { ... });
 * this.tripService.deleteTrip(1).subscribe(response => { ... });
 */
@Injectable({
  providedIn: 'root'
})
export class TripService {
  /**
   * URL base de la API para las operaciones relacionadas con los viajes.
   */
  private apiUrl = 'http://localhost:8000/api/trip';

  /**
   * Inyección del servicio `HttpClient` para realizar las peticiones HTTP.
   */
  private http = inject(HttpClient);

  /**
   * Método para crear un nuevo viaje.
   *
   * @param trip Objeto `Trip` con la información del viaje a crear.
   * @returns Un observable con la respuesta de la creación del viaje.
   */
  createTrip(trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Trip>(`${this.apiUrl}/create`, trip, { headers });
  }

  /**
   * Método para obtener un viaje por su ID.
   *
   * @param id El ID del viaje a obtener.
   * @returns Un observable con el objeto `Trip` correspondiente al ID.
   */
  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`);
  }

  /**
   * Método para obtener todos los viajes disponibles.
   *
   * @returns Un observable con un array de objetos `Trip` que representan todos los viajes.
   */
  allTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/list`);
  }

  /**
   * Método para eliminar un viaje por su ID.
   *
   * @param id El ID del viaje a eliminar.
   * @returns Un observable con la respuesta de la eliminación del viaje.
   */
  deleteTrip(id: number): Observable<Trip> {
    return this.http.delete<Trip>(`${this.apiUrl}/${id}`);
  }

  /**
   * Método para actualizar un viaje existente.
   *
   * @param id El ID del viaje a actualizar.
   * @param trip Objeto `Trip` con los nuevos datos del viaje.
   * @returns Un observable con el viaje actualizado.
   */
  updateTrip(id: number, trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Trip>(`${this.apiUrl}/${id}`, trip, { headers });
  }
}
