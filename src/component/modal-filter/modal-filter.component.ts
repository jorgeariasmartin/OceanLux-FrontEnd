import { Component } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modal-filter',
  imports: [
    NgIf
  ],
  templateUrl: './modal-filter.component.html'
})
export class ModalFilterComponent {
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
