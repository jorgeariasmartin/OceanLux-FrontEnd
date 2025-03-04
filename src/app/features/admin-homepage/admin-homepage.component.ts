import { Component } from '@angular/core';
import { SidebarComponent } from '../../../component/sidebar/sidebar.component';

/**
 * Componente de la página principal del administrador.
 *
 * Este componente representa la página principal para los usuarios con privilegios de administrador.
 * En su plantilla, se integra un componente de barra lateral (sidebar) que puede contener enlaces de navegación y otras herramientas para el administrador.
 *
 * @example
 * <app-admin-homepage></app-admin-homepage>
 */
@Component({
  selector: 'app-admin-homepage', // Selector para usar este componente en HTML
  imports: [
    SidebarComponent // Componente de barra lateral importado para su uso en esta página
  ],
  templateUrl: './admin-homepage.component.html' // Ruta de la plantilla asociada al componente
})
export class AdminHomepageComponent {
  // Este componente puede incluir lógica específica para la página de inicio del administrador
}
