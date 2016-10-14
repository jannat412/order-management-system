import {Component, Output, Input, EventEmitter} from '@angular/core';

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
}
