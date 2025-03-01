import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());
  private currentUserId: number | null = null;
  private currentUserRole: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);  // Almacenamos el rol

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

  // Método para obtener el ID del usuario
  getUserId(): Observable<number | null> {
    if (this.currentUserId !== null) {
      return new BehaviorSubject<number | null>(this.currentUserId).asObservable();
    }

    return this.getAuthenticatedUser().pipe(
      map(user => {
        this.currentUserId = user.id;
        return this.currentUserId;
      })
    );
  }

  // Método para registrar un nuevo usuario
  register(userData: any): Observable<any> {
    console.log('Datos enviados al backend:', userData);
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

  // Método para obtener datos del usuario autenticado
  getAuthenticatedUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });

    return this.http.get<any>(`${this.apiUrl}/user/me`, { headers }).pipe(
      tap(user => {
        if (user && user.id) {
          this.currentUserId = user.id;
          this.currentUserRole.next(user.rol);
        }
      })
    );
  }


  // Obtener el rol del usuario
  getUserRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  // Método para verificar si el usuario tiene el rol ROLE_ADMIN
  isAdmin(): Observable<boolean> {
    return this.getUserRole().pipe(
      map(role => role === 'ROLE_ADMIN')
    );
  }

  // Método para actualizar el usuario
  updateUser(user: any): Observable<any> {
    if (!this.currentUserId) {
      throw new Error('User ID not available');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.put<any>(`${this.apiUrl}/user/update/${this.currentUserId}`, user, { headers });
  }

  // Método para cambiar la contraseña del usuario
  changePassword(oldPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });

    const body = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword
    };

    return this.http.put<any>(`${this.apiUrl}/user/change-password`, body, { headers });
  }
}
