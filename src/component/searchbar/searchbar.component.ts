import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

/**
 * Componente Searchbar para realizar búsquedas con campo de entrada.
 * Emite un evento con el término de búsqueda al componente padre.
 */
@Component({
  selector: 'app-searchbar',
  imports: [
    FormsModule
  ],
  templateUrl: './searchbar.component.html'
})
export class SearchbarComponent {

  /**
   * Evento de salida que emite el término de búsqueda.
   */
  @Output() searchEvent = new EventEmitter<string>();

  /**
   * Variable que almacena el término de búsqueda introducido.
   */
  searchQuery: string = '';

  /**
   * Constructor del componente Searchbar.
   * @param router Servicio de enrutamiento para redirigir a la página de búsqueda.
   */
  constructor(private router: Router) {}

  /**
   * Ejecuta la búsqueda y navega a la página de resultados.
   * Si el término de búsqueda está vacío, no hace nada.
   */
  search() {
    const query = this.searchQuery.trim();
    if (!query) return;

    this.router.navigate(['/search'], { queryParams: { query } }).then(() => {
      this.searchEvent.emit(query);
      this.searchQuery = '';
    });
  }
}
