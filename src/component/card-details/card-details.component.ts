import {Component, Input} from '@angular/core';
import {Trip} from '../../app/model/trip';

@Component({
  selector: 'app-card-details',
  imports: [],
  templateUrl: './card-details.component.html'
})
export class CardDetailsComponent {
  @Input() trip!: Trip;
}
