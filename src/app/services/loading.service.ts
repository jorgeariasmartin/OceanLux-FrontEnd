import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Servicio encargado de gestionar el estado de carga (loading) de la aplicación.
 *
 * Este servicio permite controlar si la aplicación está en un estado de carga o no,
 * a través de un `BehaviorSubject` que emite un valor booleano.
 *
 * @example
 * this.loadingService.loadingOn(); // Activa el estado de carga
 * this.loadingService.loadingOff(); // Desactiva el estado de carga
 */
@Injectable({
  providedIn: 'root'
})

export class LoadingService {
  /**
   * Comportamiento del estado de carga. Inicialmente está en `false` (no cargando).
   *
   * Este `BehaviorSubject` emite un valor booleano que indica si la aplicación está en estado de carga.
   */
  private loadingSubject = new BehaviorSubject<boolean>(false);

  private activeRequests = 0;

  /**
   * Observable que emite el estado actual de carga (true si está cargando, false si no).
   * Se puede suscribir a este observable para recibir actualizaciones del estado de carga.
   */
  loading$ = this.loadingSubject.asObservable();

  /**
   * Método para activar el estado de carga (true).
   *
   * Se usa para indicar que la aplicación está en proceso de carga.
   */
  loadingOn() {
    this.activeRequests++;
    if (this.activeRequests > 0) {
      this.loadingSubject.next(true);
    }
  }

  /**
   * Método para desactivar el estado de carga (false).
   *
   * Se usa para indicar que la aplicación ha terminado el proceso de carga.
   */
  loadingOff() {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this.loadingSubject.next(false);
    }
  }
}
