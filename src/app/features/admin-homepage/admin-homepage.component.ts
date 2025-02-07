import { Component } from '@angular/core';
import {Splitter} from 'primeng/splitter';
import {SidebarComponent} from '../../../component/sidebar/sidebar.component';

@Component({
  selector: 'app-admin-homepage',
  imports: [
    Splitter,
    SidebarComponent
  ],
  templateUrl: './admin-homepage.component.html'
})
export class AdminHomepageComponent {

}
