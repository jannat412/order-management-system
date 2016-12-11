import {Component, OnInit, Input, Output} from '@angular/core';

import {IProduct} from '../../models/product';
import {OrderService} from '../../services/order.service';

@Component( {
    selector: 'oms-product-count',
    templateUrl: './product-count.component.html'
} )
export class ProductCountComponent implements OnInit {
    @Input() product: IProduct;
    @Output() step: number;
    quantity: number = 0;
    total: number = 0;

    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
        this.step = this.product.step;
        this.orderService.lineDataEmitter.subscribe(
            data => data ? this.getData() : null
        );
        this.getData();
    }

    getData() {
        const line = this.orderService.getLineData( this.product.$key );
        this.quantity = line ? line.quantity : 0;
        this.total = line ? line.total : 0;
        this.isSelected();
    }

    isSelected() {
        this.product.selected = this.quantity > 0;
    }

    updateTotal = (qnty: number): void => {
        this.quantity = qnty;
        this.total = Math.round(
                this.quantity * this.product.price * 100 ) / 100;

        this.orderService.addProductLine( {
            $key: this.product.$key,
            name: this.product.name,
            quantity: this.quantity,
            unity: this.product.unity,
            total: this.total
        } );
        this.isSelected();
    };

}
