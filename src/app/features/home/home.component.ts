import { Component } from '@angular/core';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';
import {RouterLink} from '@angular/router';

/**
 * @description
 * Componente principal de la página de inicio. Incluye un sidebar y es responsable de mostrar la vista inicial del sitio.
 *
 * @exports
 * - `HomeComponent`: Componente que define la estructura de la página de inicio.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    RouterLink
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  // Este componente no tiene lógica adicional, solo presenta la estructura con el sidebar.
}
