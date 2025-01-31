// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClient } from '@angular/common/http'; // Importar HttpClientModule globalmente

bootstrapApplication(AppComponent, {
  providers: [
    ...appConfig.providers,
    { provide: HttpClient, useClass: HttpClient},  // Proporcionar HttpClientModule si se necesita
  ]
}).catch((err) => console.error(err));
