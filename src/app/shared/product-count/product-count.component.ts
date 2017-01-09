import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ICounterData} from '../../models/counterData';
import {NumberUtils} from '../../../utils/utils';

@Component( {
    selector: 'oms-product-count',
    templateUrl: './product-count.component.html'
} )
export class ProductCountComponent {
    @Input() private counterData: ICounterData;
    @Output() private step: number|string;
    @Output() private updateCount: EventEmitter<any> = new EventEmitter<any>();
    private total: number;
    private quantity: number;

    printValue = (prop: string): number => {
        return NumberUtils.isNumber( this[prop] ) ?
            this[prop] : this.counterData[prop];
    };

    updateTotal = (qnty?: number): void => {
        this.quantity = NumberUtils.isNumber( qnty ) ? qnty : this.counterData.quantity;
        this.total = Math.round(
                this.quantity * this.counterData.valuePerUnit * 100 ) / 100;

        this.updateCount.emit( {
                quantity: this.quantity,
                total: this.total
            }
        );
    };

}
