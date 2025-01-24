import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, CalendarModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'OcenanLux-FrontEnd';
}
