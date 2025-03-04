import { Component, Input, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { LoadingService } from '../../app/services/loading.service';

/**
 * Componente que muestra un indicador de carga mientras se realizan tareas asíncronas
 * o transiciones de rutas dentro de la aplicación.
 *
 * @example
 * <app-loading [detectRouteTransitions]="true"></app-loading>
 */
@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {
  /**
   * Observable que indica si la aplicación está en estado de carga.
   */
  loading$: Observable<boolean>;

  /**
   * Propiedad de entrada que permite detectar las transiciones de ruta y
   * activar el indicador de carga durante el proceso de carga de la ruta.
   *
   * @default false
   */
  @Input()
  detectRouteTransitions = false;

  /**
   * Constructor del componente. Inyecta el servicio de carga y el router.
   *
   * @param loadingService Servicio encargado de manejar el estado de carga.
   * @param router El router de Angular para escuchar eventos de navegación.
   */
  constructor(
    private loadingService: LoadingService,
    private router: Router
  ) {
    // Se asigna el observable del estado de carga desde el servicio.
    this.loading$ = this.loadingService.loading$;
  }

  /**
   * Método de inicialización del componente. Si la propiedad `detectRouteTransitions` es `true`,
   * se suscribe a los eventos del router para activar y desactivar el indicador de carga durante
   * las transiciones de rutas.
   */
  ngOnInit() {
    if (this.detectRouteTransitions) {
      // Escucha los eventos del router y activa/desactiva el indicador de carga
      this.router.events
        .pipe(
          tap((event) => {
            // Si el evento es el inicio de la carga de la configuración de la ruta
            if (event instanceof RouteConfigLoadStart) {
              this.loadingService.loadingOn();
            }
            // Si el evento es el fin de la carga de la configuración de la ruta
            else if (event instanceof RouteConfigLoadEnd) {
              this.loadingService.loadingOff();
            }
          })
        )
        .subscribe();
    }
  }
}
