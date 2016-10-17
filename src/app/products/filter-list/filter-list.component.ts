import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component( {
    selector: 'oms-filter-list',
    templateUrl: './filter-list.component.html'
} )
export class FilterListComponent {
    private listFilter: string;
    @Output() private filterBy: EventEmitter<string>;

    constructor() {
        this.filterBy = new EventEmitter<string>();
    }

    filterName() {
        this.filterBy.emit( this.listFilter );
    }

    setClasses() {
        return 'alert alert-success';
    }

    clear() {
        this.listFilter = '';
        this.filterName();
    }
}
