import { HttpContextToken, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { catchError, throwError } from 'rxjs';

export const SkipAuth = new HttpContextToken<boolean>(() => false);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toastService = inject(ToastService);
  const token = authService.getToken();

  console.log('Interceptando:', req.url);

  if (req.url.endsWith('/logaccount') || req.context.get(SkipAuth)) {
    console.log('⏩ Saltando autenticación:', req.url);
    return next(req);
  }

  if (!token) {
    console.warn('🔴 No hay token, redirigiendo a login...');
    toastService.showMessage('error', 'Sesión Expirada', 'Tu sesión ha caducado. Inicia sesión nuevamente.');

    authService.logout();
    router.navigate(['/logaccount']).then(() => {});

    return next(req);
  }

  const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        console.error('🚨 Token inválido o expirado, cerrando sesión...');
        toastService.showMessage('error', 'Acceso Denegado', 'Tu sesión ha expirado o no tienes permisos.');

        authService.logout();
        router.navigate(['/logaccount']);
      }
      return throwError(() => error);
    })
  );
};
