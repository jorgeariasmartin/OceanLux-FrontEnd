import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

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
  constructor(public messageService: MessageService) {}

  addMessage(severity: string, summary: string, detail: string) {
    this.messageService.add({ severity, summary, detail });
  }

  show() {
    this.addMessage('info', 'Info Message', 'This is a responsive toast message');
  }
}
