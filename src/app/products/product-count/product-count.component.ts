import {Component, OnInit, Input, Output} from '@angular/core';
import {IProduct} from '../../models/product';

@Component( {
    selector: 'oms-product-count',
    templateUrl: './product-count.component.html',
    styleUrls: ['product-count.component.scss']
} )
export class ProductCountComponent implements OnInit {
    @Input() product: IProduct;
    @Output() step: number;
    quantity: number;
    total: number = 0;

    ngOnInit() {
        this.step = this.product.step;
    }

    updateTotal = (qnty: number): void => {
        this.quantity = qnty;
        this.total = Math.round(
            this.quantity * this.product.price * 100 ) / 100;
    };

}
