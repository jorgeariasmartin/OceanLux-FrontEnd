import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {}

  // Método de login
  login(user: User): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login_check`, user).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.authStatus.next(true);
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user/create`, userData);
  }

  // Verifica si hay un token guardado
  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Método para obtener el token
  getToken(): string {
    return <string>localStorage.getItem('authToken');
  }

  // Método para saber si el usuario está autenticado
  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('authToken');
    this.authStatus.next(false);
    this.router.navigate(['/logaccount']).then(r => r);
  }
}
