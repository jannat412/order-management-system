import {Component, Input, Output, OnChanges} from '@angular/core';

import {IProduct} from '../../models/product';
import {OrderService} from '../../services/order.service';
import {IOrderLine} from '../../models/orderLine';

@Component( {
    selector: 'oms-product-count',
    templateUrl: './product-count.component.html'
} )
export class ProductCountComponent implements OnChanges {
    @Input() product: IProduct;
    @Input() productOrderLine: IOrderLine;
    @Output() step: number|string;
    private quantity: number = 0;
    private total: number = 0;

    constructor(private orderService: OrderService) {
    }

    ngOnChanges() {
        this.quantity = this.productOrderLine ? this.productOrderLine.quantity : 0;
        this.total = this.productOrderLine ? this.productOrderLine.total : 0;
        this.isSelected();
    }

    private isSelected() {
        this.product.selected = this.quantity > 0;
    }

    updateTotal = (qnty: number): void => {
        this.quantity = qnty;
        this.total = Math.round(
                this.quantity * this.product.price * 100 ) / 100;

        this.orderService.addProductLine( {
            $key: this.product.$key,
            name: this.product.name,
            price: this.product.price,
            quantity: this.quantity,
            unity: this.product.unity,
            total: this.total
        } );
        this.isSelected();
    };

}
