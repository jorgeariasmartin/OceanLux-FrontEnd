import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { routes } from './app.routes';
import {customtheme} from './mytheme';
import {loadingInterceptor} from './Interceptors/loading.interceptor';
import {authInterceptor} from './Interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([authInterceptor, loadingInterceptor])
    ),
    providePrimeNG({
      theme: {
        preset: customtheme,
        options: {
          darkModeSelector: false || 'none'
        }
      }
    }),
    provideHttpClient()
  ]
};
