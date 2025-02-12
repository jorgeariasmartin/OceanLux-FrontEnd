import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

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

  search() {
    if (!this.searchQuery.trim()) return;
    this.searchEvent.emit(this.searchQuery);
    this.searchQuery = '';
  }
}
