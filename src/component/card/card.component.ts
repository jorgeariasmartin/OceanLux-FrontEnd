import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Trip} from '../../app/model/trip';

@Component({
  selector: 'app-card',
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() shopped: boolean = false;
  @Input() trip!: Trip;
}
