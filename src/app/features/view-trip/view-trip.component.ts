import { Component } from '@angular/core';
import {HeaderComponent} from '../../../component/header/header.component';
import {SearchbarComponent} from '../../../component/searchbar/searchbar.component';
import {CardComponent} from '../../../component/card/card.component';
import {Checkbox} from 'primeng/checkbox';
import {FormsModule} from '@angular/forms';
import {InputNumber} from 'primeng/inputnumber';
import {Fluid} from 'primeng/fluid';
import {ButtonModule} from 'primeng/button';

@Component({
  selector: 'app-view-trip',
  imports: [
    HeaderComponent,
    SearchbarComponent,
    CardComponent,
    Checkbox,
    FormsModule,
    InputNumber,
    Fluid,
    ButtonModule
  ],
  templateUrl: './view-trip.component.html',
  styles: `styles.css`
})
export class ViewTripComponent {
  extra: string[] = [];
  value: number = 1;

}
