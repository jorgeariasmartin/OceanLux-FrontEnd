import { Component } from '@angular/core';
import {SidebarComponent} from '../../../component/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
