import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

import {IProduct} from '../../models/product';
import {OrderService} from '../../services/order.service';

@Component( {
    selector: 'oms-product-count',
    templateUrl: './product-count.component.html',
    styleUrls: ['product-count.component.scss']
} )
export class ProductCountComponent implements OnInit {
    @Input() product: IProduct;
    @Output() step: number;
    quantity: number = 0;
    total: number = 0;

    constructor(private orderService: OrderService) {}
    ngOnInit() {
        this.step = this.product.step;
        this.getData();
    }

    getData() {
        const line = this.orderService.getLineData(this.product.$key);
        console.log(line);
        this.quantity = line ? line.quantity : 0;
        this.total = line ? line.total : 0;
    }

    updateTotal = (qnty: number): void => {
        this.quantity = qnty;
        this.total = Math.round(
            this.quantity * this.product.price * 100 ) / 100;

        this.orderService.addProductLine({
            productKey: this.product.$key,
            quantity: this.quantity,
            total: this.total
        });
    };

}
