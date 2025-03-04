import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

/**
 * Servicio encargado de mostrar mensajes de notificación tipo "Toast" en la interfaz de usuario.
 *
 * Este servicio utiliza el servicio `MessageService` de PrimeNG para mostrar mensajes con diferentes niveles de severidad (informativos, de advertencia, de error, etc.)
 *
 * @example
 * this.toastService.showMessage('success', 'Operación exitosa', 'La operación se completó con éxito.');
 * this.toastService.showMessage('error', 'Error', 'Ocurrió un error al procesar la solicitud.');
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  /**
   * Constructor que inyecta el servicio `MessageService` de PrimeNG para mostrar mensajes tipo "Toast".
   *
   * @param messageService Servicio utilizado para mostrar los mensajes de notificación.
   */
  constructor(private messageService: MessageService) {}

  /**
   * Método para mostrar un mensaje de notificación tipo "Toast".
   *
   * @param severity El nivel de severidad del mensaje. Puede ser `success`, `info`, `warn`, `error`, etc.
   * @param summary Resumen breve del mensaje que se mostrará.
   * @param detail Descripción detallada del mensaje que se mostrará.
   */
  showMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
}
