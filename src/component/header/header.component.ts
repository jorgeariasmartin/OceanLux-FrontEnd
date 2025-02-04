import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, SidebarComponent, NgIf],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  @Input() showSidebar: boolean = false;
}
