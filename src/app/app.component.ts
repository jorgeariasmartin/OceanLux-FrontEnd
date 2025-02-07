import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import {LoadingComponent} from '../component/loading/loading.component';


@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, LoadingComponent],
  templateUrl: './app.component.html',
  standalone: true
})
export class AppComponent {
  title = 'OceanLux-FrontEnd';
}
