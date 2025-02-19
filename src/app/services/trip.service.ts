import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../model/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private apiUrl = 'http://localhost:8000/api/trip';
  private http = inject(HttpClient);

  createTrip(trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Trip>(`${this.apiUrl}/create`, trip, { headers });
  }

  getTripById(id: number): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${id}`, { withCredentials: true });
  }

  allTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(`${this.apiUrl}/list`);
  }

  deleteTrip(id: number): Observable<Trip> {
    return this.http.delete<Trip>(`${this.apiUrl}/${id}`);
  }

  updateTrip(id: number, trip: Trip): Observable<Trip> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Trip>(`${this.apiUrl}/${id}`, trip, { headers });
  }
}
