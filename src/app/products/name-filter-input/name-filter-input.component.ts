import {Component, Output, EventEmitter} from '@angular/core';

@Component( {
    selector: 'oms-filter-list',
    templateUrl: 'name-filter-input.component.html'
} )
export class NameFilterInputComponent {
    private listFilter: string;
    @Output() private filterByName: EventEmitter<string>;

    constructor() {
        this.filterByName = new EventEmitter<string>();
    }

    filterName = (): void => this.filterByName.emit( this.listFilter );

    /* TODO make success or error style if filtering return or not something*/
    setClasses = (): string =>  'alert alert-success';

    clear = (): void => {
        this.listFilter = '';
        this.filterName();
    };
}
