import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';
import { NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { AuthService } from '../../app/services/auth.service';
import { Observable } from 'rxjs';

/**
 * Componente Sidebar para la navegación lateral.
 * Permite la visualización dinámica basada en la autenticación y el rol del usuario.
 */
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('sidebarAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
  imports: [
    NgIf,
    NgClass,
    RouterLink,
    CommonModule,
    AsyncPipe
  ],
  standalone: true
})
export class SidebarComponent implements OnInit {

  /**
   * Estado de apertura del sidebar.
   */
  isSidebarOpen = false;

  /**
   * Indica si el componente está en estado de carga.
   */
  isLoading = true;

  /**
   * Observable que indica si el usuario está autenticado.
   */
  isLoggedIn!: Observable<boolean>;

  /**
   * Rol del usuario autenticado.
   */
  userRole: string | null = null;

  /**
   * Constructor del componente Sidebar.
   * @param authService Servicio de autenticación para gestionar la sesión del usuario.
   */
  constructor(private authService: AuthService) {}

  /**
   * Inicializa el componente, obteniendo el rol del usuario y simulando un retraso de carga.
   */
  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
      console.log(this.userRole);
    });

    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  /**
   * Alterna el estado del sidebar (abierto/cerrado).
   */
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  /**
   * Cierra sesión del usuario a través del servicio de autenticación.
   */
  logout() {
    this.authService.logout();
  }
}
