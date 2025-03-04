import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import {catchError, finalize, throwError} from 'rxjs';
import { LoadingService } from '../services/loading.service';

/**
 * Token que permite especificar si una solicitud debe omitir la visualización del indicador de carga.
 *
 * @example
 * const httpRequest = req.context.get(SkipLoading);
 */
export const SkipLoading = new HttpContextToken<boolean>(() => false);

/**
 * Interceptor que maneja la visualización de un indicador de carga durante las solicitudes HTTP.
 *
 * Este interceptor activa el servicio de carga antes de hacer la solicitud y desactiva el indicador de carga cuando la solicitud se completa.
 * Si una solicitud especifica la opción `SkipLoading` en su contexto, el interceptor omite el manejo del indicador de carga.
 *
 * @param req La solicitud HTTP.
 * @param next La función que maneja la siguiente acción en el pipeline HTTP.
 * @returns La solicitud procesada con la gestión del indicador de carga, o sin gestionarlo si se omite.
 *
 * @example
 * loadingInterceptor(req, next);
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService); // Servicio de carga

  // Verificar si la solicitud debe omitir el indicador de carga
  if (req.context.get(SkipLoading)) {
    return next(req); // Continuar sin mostrar el indicador de carga
  }

  // Activar el indicador de carga antes de la solicitud
  loadingService.loadingOn();

  return next(req).pipe(
    finalize(() => {
      loadingService.loadingOff(); // Desactivar el indicador de carga cuando la solicitud termine
    }),
    catchError((error) => {
      loadingService.loadingOff(); // Asegúrate de desactivar el indicador si ocurre un error
      return throwError(() => error); // Propagar el error
    })
  );
};
