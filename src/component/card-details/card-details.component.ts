import {Component, Input} from '@angular/core';
import {Trip} from '../../app/model/trip';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-card-details',
  imports: [
    RouterLink
  ],
  templateUrl: './card-details.component.html'
})
export class CardDetailsComponent {
  @Input() trip!: Trip;
}
