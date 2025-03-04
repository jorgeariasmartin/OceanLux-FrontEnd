import { HttpContextToken, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { catchError, throwError } from 'rxjs';

/**
 * Token que permite especificar si una solicitud debe omitir la autenticación.
 *
 * @example
 * const httpRequest = req.context.get(SkipAuth);
 */
export const SkipAuth = new HttpContextToken<boolean>(() => false);

/**
 * Interceptor que maneja la autenticación para las solicitudes HTTP en la aplicación.
 *
 * Este interceptor revisa si existe un token de autenticación antes de cada solicitud. Si la solicitud requiere autenticación y no tiene un token válido,
 * el interceptor redirige al usuario al login. Además, permite omitir la autenticación en ciertas rutas especificadas.
 *
 * @param req La solicitud HTTP.
 * @param next La función que maneja la siguiente acción en el pipeline HTTP.
 * @returns La solicitud procesada con el token de autenticación, o la solicitud sin modificar si se omite la autenticación.
 *
 * @example
 * authInterceptor(req, next);
 */
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  // Inyección de dependencias
  const authService = inject(AuthService); // Servicio de autenticación
  const router = inject(Router); // Servicio de navegación
  const toastService = inject(ToastService); // Servicio de notificaciones
  const token = authService.getToken(); // Obtención del token de autenticación

  console.log('Interceptando:', req.url);

  // Verificar si la ruta actual debe omitir la autenticación
  if (req.url.endsWith('/logaccount') || req.url.endsWith('/send-verification-email') || req.url.includes('/verify') || req.context.get(SkipAuth)) {
    console.log('⏩ Saltando autenticación:', req.url);
    return next(req); // Continuar sin modificar la solicitud
  }

  // Si no hay token, redirigir al login
  if (!token) {
    console.warn('🔴 No hay token, redirigiendo a login...');
    toastService.showMessage('error', 'Sesión Expirada', 'Tu sesión ha caducado. Inicia sesión nuevamente.');

    // Cerrar sesión y redirigir
    authService.logout();
    router.navigate(['/logaccount']).then(() => {});

    return next(req); // Continuar sin modificar la solicitud
  }

  // Clonar la solicitud e incluir el token en los encabezados
  const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Manejo de errores relacionados con la autenticación
      if (error.status === 401 || error.status === 403) {
        console.error('🚨 Token inválido o expirado, cerrando sesión...');
        toastService.showMessage('error', 'Acceso Denegado', 'Tu sesión ha expirado o no tienes permisos.');

        // Cerrar sesión y redirigir
        authService.logout();
        router.navigate(['/logaccount']);
      }
      return throwError(() => error); // Propagar el error
    })
  );
};
