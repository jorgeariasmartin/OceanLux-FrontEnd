import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  imports: [
    FormsModule
  ],
  templateUrl: './searchbar.component.html'
})
export class SearchbarComponent {
  @Output() searchEvent = new EventEmitter<string>();
  searchQuery: string = '';

  constructor(private router: Router) {}

  search() {
    const query = this.searchQuery.trim();
    if (!query) return;

    this.router.navigate(['/search'], { queryParams: { query } }).then(() => {
      this.searchEvent.emit(query);
      this.searchQuery = '';
    });
  }
}
