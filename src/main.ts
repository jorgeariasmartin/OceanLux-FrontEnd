import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [...appConfig.providers] // ✅ Usa solo la configuración de appConfig
}).catch((err) => console.error(err));
