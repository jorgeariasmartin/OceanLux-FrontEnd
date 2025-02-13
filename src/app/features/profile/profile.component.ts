import { Component } from '@angular/core';
import {HeaderComponent} from '../../../component/header/header.component';
import {SearchbarComponent} from '../../../component/searchbar/searchbar.component';
import {ButtonModule} from 'primeng/button';
import {AuthService} from '../../services/auth.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [
    HeaderComponent,
    SearchbarComponent,
    ButtonModule,
    CommonModule
  ],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getAuthenticatedUser().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (error) => {
        console.error('Error obteniendo el usuario', error);
      }
    });
  }
}
