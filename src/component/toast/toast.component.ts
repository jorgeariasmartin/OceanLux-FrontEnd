import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

/**
 * Componente Toast para mostrar notificaciones emergentes.
 * Utiliza PrimeNG para brindar una interfaz de notificaciones estilizada.
 */
@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styles: [`
    .toast-container {
      position: fixed;
      top: 1rem;
      right: 1rem;
      width: auto;
      max-width: 90%;
      z-index: 1000;
    }
  `],
  imports: [
    Toast
  ],
  providers: [MessageService]
})
export class ToastComponent {

  /**
   * Constructor del componente Toast.
   * @param messageService Servicio de mensajería de PrimeNG para gestionar las notificaciones.
   */
  constructor(public messageService: MessageService) {}

  /**
   * Agrega un nuevo mensaje al Toast.
   * @param severity Tipo de mensaje (info, success, warn, error).
   * @param summary Título del mensaje.
   * @param detail Detalle del mensaje.
   */
  addMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }
}
