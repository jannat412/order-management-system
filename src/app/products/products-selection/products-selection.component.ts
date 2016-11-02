import {Component, Output, EventEmitter, OnInit} from '@angular/core';

@Component( {
    selector: 'oms-products-selection',
    templateUrl: './products-selection.component.html',
    styleUrls: ['./products-selection.component.scss']
} )
export class ProductsSelectionComponent extends OnInit {
    @Output() private filterBySelected: EventEmitter<boolean> = new EventEmitter<boolean>();
    private selectedFilterStatus: boolean = false;
    private activeMessage: string;

    private onSelectedFilter = () => {
        this.selectedFilterStatus = !this.selectedFilterStatus;
        this.filterBySelected.emit( this.selectedFilterStatus );
        this.activeMessage = this.getMessage();
    };

    private getMessage = () => this.selectedFilterStatus ? 'Mostra\'m tots els productes' : 'Mostra\'m el que he seleccionat';

    ngOnInit() {
        this.activeMessage = this.getMessage();
    }
}
