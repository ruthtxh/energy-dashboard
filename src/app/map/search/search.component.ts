import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  @Output() filterEvent = new EventEmitter<string>();

  filterValue(value: string) {
    this.filterEvent.emit(value);
  }
}
