import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationService {
  private apiUrl = 'http://localhost:8000/api/user/verify';

  constructor(private http: HttpClient) {}

  verifyEmail(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?token=${token}`);
  }
}
