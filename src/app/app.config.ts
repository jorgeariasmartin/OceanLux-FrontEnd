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

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Opcional, solo si lo necesitas
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor, loadingInterceptor]) // ✅ Mantén los interceptores
    ),
    providePrimeNG({
      theme: {
        preset: customtheme,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    }),
    importProvidersFrom(ToastModule), // ✅ Esto ya proporciona lo necesario para los toasts
    MessageService // ⚠️ Puede ser redundante, pero si da error, déjalo
  ]
};
