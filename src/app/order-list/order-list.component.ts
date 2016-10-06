import {Component, OnInit} from '@angular/core';
import {Product} from '../classes/product';
import {ProductsService} from '../services/products.service';

@Component( {
    selector: 'oms-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css'],
    providers: [ProductsService]
} )
export class OrderListComponent implements OnInit {
    products: Product[];

    constructor(private _productsService: ProductsService) {
        this.products = this._productsService.getProducts();
    }

    ngOnInit() {
    }

}
