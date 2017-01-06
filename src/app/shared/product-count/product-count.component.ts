import {Component, Input, Output} from '@angular/core';
import {ICounterData} from '../../models/counterData';
import {NumberUtils} from '../../../utils/number.utils';

@Component( {
    selector: 'oms-product-count',
    templateUrl: './product-count.component.html'
} )
export class ProductCountComponent {
    @Input() counterData: ICounterData;
    @Output() step: number|string;
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

        // this.orderService.addProductLine( {
        //     $key: this.product.$key,
        //     name: this.product.name,
        //     price: this.product.price,
        //     quantity: this.quantity,
        //     unity: this.product.unity,
        //     total: this.total
        // } );

    };

}
