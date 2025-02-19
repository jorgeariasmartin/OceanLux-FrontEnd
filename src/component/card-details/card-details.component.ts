import {Component, Input} from '@angular/core';
import {Trip} from '../../app/model/trip';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-card-details',
  imports: [
    NgOptimizedImage
    RouterLink
  ],
  templateUrl: './card-details.component.html'
})
export class CardDetailsComponent {
  @Input() trip!: Trip;
}
