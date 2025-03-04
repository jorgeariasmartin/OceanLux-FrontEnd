import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

/**
 * Guard que verifica si el usuario tiene el rol de administrador antes de permitirle acceder a una ruta.
 * Si el usuario no tiene el rol de administrador, se le redirige a la página de búsqueda.
 *
 * @example
 * const canActivate = this.adminRoleGuard.canActivate(route, state);
 */
@Injectable({
  providedIn: 'root'
})
export class AdminRoleGuard implements CanActivate {

  /**
   * Constructor que inyecta los servicios necesarios.
   *
   * @param authService Servicio encargado de gestionar la autenticación y los roles de usuario.
   * @param router Servicio que gestiona la navegación entre rutas.
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Método que determina si se puede acceder a la ruta. Verifica si el usuario tiene el rol de administrador.
   * Si no tiene el rol de administrador, redirige al usuario a la página de búsqueda.
   *
   * @param route Información sobre la ruta solicitada.
   * @param state Información sobre el estado de la ruta.
   * @returns Un observable que emite `true` si el usuario tiene el rol de administrador, `false` si no.
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAdmin().pipe(
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/search']);  // Redirige si no tiene rol de admin
        }
      })
    );
  }
}
