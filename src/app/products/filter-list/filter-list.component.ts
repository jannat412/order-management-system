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

    filterName = (): void => this.filterBy.emit( this.listFilter );

    /* TODO make success or error style if filtering return or not something*/
    setClasses = (): string =>  'alert alert-success';

    clear = (): void => {
        this.listFilter = '';
        this.filterName();
    };
}
