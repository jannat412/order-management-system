import {Component, Output, EventEmitter} from '@angular/core';

@Component( {
    selector: 'oms-name-filter-list',
    templateUrl: './name-filter-input.component.html'
} )
export class NameFilterInputComponent {
    private listFilter: string;
    @Output() private filterBy: EventEmitter<string>;

    constructor() {
        this.filterBy = new EventEmitter<string>();
    }

    private filterName = (): void => this.filterBy.emit( this.listFilter );

    /* TODO make success or error style if filtering return or not something*/
    private setClasses = (): string =>  'alert alert-success';

    public clear = (): void => {
        this.listFilter = '';
        this.filterName();
    };
}
