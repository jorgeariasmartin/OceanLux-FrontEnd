import {Component, Input} from '@angular/core';
import {DatePipe, NgClass, NgIf} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Trip} from '../../app/model/trip';

@Component({
  selector: 'app-card',
  imports: [
    NgIf,
    RouterLink,
    DatePipe,
    NgClass
  ],
  templateUrl: './card.component.html'
})
export class CardComponent {
  @Input() shopped: boolean = false;
  @Input() trip!: Trip;

  isPastDate(dateString: string): boolean {
    const tripDate = new Date(dateString);
    const today = new Date();
    return tripDate < today;
  }

}
