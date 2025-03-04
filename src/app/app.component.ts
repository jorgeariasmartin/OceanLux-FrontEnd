import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoadingComponent } from '../component/loading/loading.component';
import { Toast } from 'primeng/toast';

/**
 * Componente principal de la aplicación.
 *
 * Este componente es el punto de entrada de la aplicación y contiene la estructura básica de la misma.
 * Su plantilla maneja el enrutamiento y la visualización de otros componentes importantes como el indicador de carga y las notificaciones.
 *
 * @example
 * <app-root></app-root>
 */
@Component({
  selector: 'app-root', // Selector del componente en el HTML
  imports: [RouterModule, RouterOutlet, LoadingComponent, Toast], // Módulos y componentes importados para su uso en este componente
  templateUrl: './app.component.html', // Ruta de la plantilla asociada al componente
  standalone: true // Marca el componente como independiente, no necesita un módulo
})
export class AppComponent {
  /**
   * Título de la aplicación.
   * Se utiliza en la plantilla para mostrar el nombre de la aplicación o en el encabezado de la misma.
   *
   * @example
   * <h1>{{ title }}</h1>
   */
  title = 'OceanLux-FrontEnd';
}
