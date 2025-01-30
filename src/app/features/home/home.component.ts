import { Component } from '@angular/core';
import {SidebarComponent} from '../../../component/sidebar/sidebar.component';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SidebarComponent,
    Button
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {

}
