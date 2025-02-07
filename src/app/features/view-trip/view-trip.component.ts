import { Component } from '@angular/core';
import {HeaderComponent} from '../../../component/header/header.component';
import {SearchbarComponent} from '../../../component/searchbar/searchbar.component';
import {CardComponent} from '../../../component/card/card.component';

@Component({
  selector: 'app-view-trip',
  imports: [
    HeaderComponent,
    SearchbarComponent,
    CardComponent
  ],
  templateUrl: './view-trip.component.html'
})
export class ViewTripComponent {

}
