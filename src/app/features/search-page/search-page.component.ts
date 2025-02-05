import { Component } from '@angular/core';
import {HeaderComponent} from '../../../component/header/header.component';
import {SearchbarComponent} from '../../../component/searchbar/searchbar.component';
import {CardDetailsComponent} from '../../../component/card-details/card-details.component';
import {ModalFilterComponent} from '../../../component/modal-filter/modal-filter.component';

@Component({
  selector: 'app-search-page',
  imports: [
    HeaderComponent,
    SearchbarComponent,
    CardDetailsComponent,
    ModalFilterComponent
  ],
  templateUrl: './search-page.component.html'
})
export class SearchPageComponent {

}
