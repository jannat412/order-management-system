import {Component, OnInit, Input, Output} from '@angular/core';
import {IProduct} from '../product';

@Component( {
    selector: 'oms-products-count',
    templateUrl: './products-count.component.html',
    styleUrls: ['products-count.component.scss']
} )
export class ProductsCountComponent implements OnInit {
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
