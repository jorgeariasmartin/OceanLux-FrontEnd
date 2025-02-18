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
        console.log('Usuario obtenido', this.user);
      },
      error: (error) => {
        console.error('Error obteniendo el usuario', error);
      }
    });
  }

  getAvatarUrl(username: string): string {
    if (!username) {
      // Si el username es undefined o vacío, usamos un valor por defecto (por ejemplo, "XX")
      return `https://ui-avatars.com/api/?name=XX&background=0D8ABC&color=fff`;
    }

    // Extraemos las dos primeras letras del username
    const initials = username.substring(0, 2).toUpperCase();

    // Retorna la URL con las iniciales como parámetro
    return `https://ui-avatars.com/api/?name=${initials}&background=0D8ABC&color=fff`;
  }

}
