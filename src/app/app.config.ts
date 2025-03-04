import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { customtheme } from './mytheme';
import { loadingInterceptor } from './Interceptors/loading.interceptor';
import { authInterceptor } from './Interceptors/auth.interceptor';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

/**
 * Configuración de la aplicación Angular.
 *
 * Este objeto `appConfig` define los proveedores y configuraciones necesarios para que la aplicación funcione correctamente.
 *
 * Se configura la detección de cambios de zona, las rutas de la aplicación, animaciones, interceptores de HTTP, el tema de PrimeNG y otros servicios como el de mensajes.
 *
 * @example
 * import { appConfig } from './app.config';
 *
 * @returns La configuración de la aplicación Angular.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Configuración de la detección de cambios de zona.
     * Permite la coalescencia de eventos para mejorar el rendimiento.
     *
     * @default true
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Configuración de las rutas de la aplicación.
     * Define las rutas que serán gestionadas por el router.
     *
     * @example
     * provideRouter(routes)
     */
    provideRouter(routes),

    /**
     * Proveedor de animaciones asíncronas.
     * Permite la carga de animaciones de manera asíncrona.
     */
    provideAnimationsAsync(),

    /**
     * Configuración de PrimeNG.
     * Se aplica un tema personalizado definido por `customtheme` y se ajusta la configuración de modo oscuro.
     */
    providePrimeNG({
      theme: {
        preset: customtheme,
        options: {
          darkModeSelector: false || 'none' // Configura el selector de modo oscuro
        }
      }
    }),

    /**
     * Proveedor de cliente HTTP con interceptores.
     * Se aplican los interceptores de autenticación (`authInterceptor`) y de carga (`loadingInterceptor`).
     */
    provideHttpClient(
      withInterceptors([authInterceptor, loadingInterceptor]) // Se mantienen los interceptores configurados
    ),

    /**
     * Importación del módulo de Toast de PrimeNG.
     * Este módulo es necesario para mostrar notificaciones de toast en la aplicación.
     */
    importProvidersFrom(ToastModule),

    /**
     * Proveedor del servicio `MessageService` de PrimeNG.
     * Permite mostrar mensajes y notificaciones en la aplicación.
     */
    MessageService
  ]
};
