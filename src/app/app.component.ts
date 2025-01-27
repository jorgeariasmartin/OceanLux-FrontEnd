import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../component/header/header.component';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'OceanLux-FrontEnd';
}
