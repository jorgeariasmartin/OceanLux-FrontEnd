import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [
    NgIf
  ],
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() shopped: boolean = false;
}
