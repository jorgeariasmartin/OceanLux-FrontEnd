import { Component } from '@angular/core';
import {HeaderComponent} from '../../../component/header/header.component';
import {SearchbarComponent} from '../../../component/searchbar/searchbar.component';
import {CardComponent} from '../../../component/card/card.component';

@Component({
  selector: 'app-main-page',
  imports: [
    HeaderComponent,
    SearchbarComponent,
    CardComponent
  ],
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

}
