import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../model/User';

/**
 * Servicio encargado de la autenticación de usuarios, incluyendo el login, registro,
 * obtención de datos del usuario autenticado, manejo de roles, y cierre de sesión.
 *
 * @example
 * const isAuthenticated = this.authService.isAuthenticated();
 * this.authService.login(user).subscribe(response => { ... });
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  /**
   * URL base de la API de autenticación. Debe ser cambiada según la configuración del servidor.
   */
  private apiUrl = 'http://localhost:8000/api';

  /**
   * Estado de la autenticación del usuario, mediante un BehaviorSubject que emite valores de `true` o `false`.
   */
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  /**
   * Almacena el ID del usuario autenticado.
   */
  private currentUserId: number | null = null;

  /**
   * Almacena el rol del usuario autenticado (por ejemplo, 'ROLE_USER', 'ROLE_ADMIN').
   */
  private currentUserRole: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  /**
   * Constructor que inyecta los servicios necesarios para la autenticación y redirección.
   *
   * @param http Servicio HttpClient utilizado para realizar solicitudes HTTP.
   * @param router Servicio Router utilizado para redirigir rutas dentro de la aplicación.
   */
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Método para realizar el login de un usuario.
   * Guarda el token en el almacenamiento local y actualiza el estado de autenticación.
   *
   * @param user Usuario que intenta iniciar sesión.
   * @returns Un observable que emite la respuesta del backend.
   */
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

  /**
   * Método para obtener el ID del usuario autenticado.
   *
   * @returns Un observable que emite el ID del usuario autenticado o `null` si no está disponible.
   */
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

  /**
   * Método para registrar un nuevo usuario.
   *
   * @param userData Datos del nuevo usuario.
   * @returns Un observable que emite la respuesta del backend tras el registro.
   */
  register(userData: any): Observable<any> {
    console.log('Datos enviados al backend:', userData);
    return this.http.post<any>(`${this.apiUrl}/user/create`, userData);
  }

  /**
   * Método para verificar si existe un token de autenticación guardado en el almacenamiento local.
   *
   * @returns `true` si hay un token, `false` en caso contrario.
   */
  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  /**
   * Método para obtener el token de autenticación almacenado.
   *
   * @returns El token de autenticación o una cadena vacía si no existe.
   */
  getToken(): string {
    return <string>localStorage.getItem('authToken');
  }

  /**
   * Método para verificar si el usuario está autenticado.
   *
   * @returns Un observable que emite `true` si el usuario está autenticado, `false` si no.
   */
  isAuthenticated(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  /**
   * Método para cerrar sesión.
   * Elimina el token del almacenamiento local y actualiza el estado de autenticación.
   *
   * @returns Redirige al usuario a la página de login.
   */
  logout(): void {
    localStorage.removeItem('authToken');
    this.authStatus.next(false);
    this.router.navigate(['/logaccount']).then(r => r);
  }

  /**
   * Método para obtener los datos del usuario autenticado.
   *
   * @returns Un observable que emite los datos del usuario autenticado.
   */
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

  /**
   * Método para obtener el rol del usuario autenticado.
   *
   * @returns Un observable que emite el rol del usuario o `null` si no está disponible.
   */
  getUserRole(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  /**
   * Método para verificar si el usuario tiene el rol de administrador.
   *
   * @returns Un observable que emite `true` si el usuario tiene el rol de 'ROLE_ADMIN', `false` si no.
   */
  isAdmin(): Observable<boolean> {
    return this.getUserRole().pipe(
      map(role => role === 'ROLE_ADMIN')
    );
  }

  /**
   * Método para actualizar los datos del usuario autenticado.
   *
   * @param user Datos actualizados del usuario.
   * @returns Un observable que emite la respuesta del backend tras la actualización.
   */
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

  /**
   * Método para cambiar la contraseña del usuario autenticado.
   *
   * @param oldPassword La contraseña actual del usuario.
   * @param newPassword La nueva contraseña que se desea establecer.
   * @param confirmPassword Confirmación de la nueva contraseña.
   * @returns Un observable que emite la respuesta del backend tras el cambio de contraseña.
   */
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
