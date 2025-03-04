import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgIf } from '@angular/common';
import { CheckTicketsComponent } from '../check-tickets/check-tickets.component';

/**
 * Componente que representa el encabezado de la aplicación.
 * Este componente incluye una barra lateral y una opción para verificar tickets.
 *
 * @example
 * <app-header [showSidebar]="true"></app-header>
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SidebarComponent, NgIf, CheckTicketsComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  /**
   * Propiedad de entrada que determina si se debe mostrar la barra lateral.
   *
   * @default false
   */
  @Input() showSidebar: boolean = false;
}
