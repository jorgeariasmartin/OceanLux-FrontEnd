import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Yacht} from '../model/yacht';

@Injectable({
  providedIn: 'root'
})
export class YachtService {

  private apiUrl = 'http://localhost:8000/api/yacht';

  constructor(private http: HttpClient) { }

  createYacht(yacht: Yacht): Observable<Yacht> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.post<Yacht>(`${this.apiUrl}/create`, yacht, { headers });
  }

  getYachts(): Observable<Yacht[]> {
    return this.http.get<Yacht[]>(`${this.apiUrl}/all`);
  }

  deleteYacht(id: number): Observable<Yacht> {
    return this.http.delete<Yacht>(`${this.apiUrl}/delete/${id}`);
  }

  updateYacht(id: number, yacht: Yacht): Observable<Yacht> {
    const headers = { 'Content-Type': 'application/json' };
    return this.http.put<Yacht>(`${this.apiUrl}/update/${id}`, yacht, { headers });
  }

}
