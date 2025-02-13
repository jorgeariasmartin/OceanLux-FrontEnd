import { Component } from '@angular/core';
import {HeaderComponent} from '../../../component/header/header.component';
import {SearchbarComponent} from '../../../component/searchbar/searchbar.component';

@Component({
  selector: 'app-profile',
  imports: [
    HeaderComponent,
    SearchbarComponent,
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {

}
