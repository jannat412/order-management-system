import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'oms-filter-list',
  templateUrl: './filter-list.component.html'
})
export class FilterListComponent {
  listFilter: string;
  @Output() filterBy: EventEmitter<string> = new EventEmitter<string>();

  filterName() {
    this.filterBy.emit(this.listFilter);
  }

  clear() {
    this.listFilter = '';
    this.filterName();
  }
}
