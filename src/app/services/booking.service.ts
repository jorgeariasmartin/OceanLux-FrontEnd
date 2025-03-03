import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8000/api/booking';

  constructor(private http: HttpClient) {}

  createReservation(reservation: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/create`, reservation, { headers });
  }

  getPendingReservationsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pending/${userId}`);
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  updateReservationStatus(bookingId: number, status: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-status/${bookingId}`, { status });
  }

  getConfirmedReservations(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/confirmed/${userId}`);
  }

  getTripById(tripId: number): Observable<any> {
    return this.http.get(`/api/trip/${tripId}`);
  }
}
