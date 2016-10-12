import {Component, OnInit} from '@angular/core';
import {Product} from '../classes/product';
import {ProductsService} from '../services/products.service';
import {Response} from '@angular/http';

@Component( {
    selector: 'oms-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css'],
    providers: [ProductsService]
} )
export class OrderListComponent implements OnInit {
    products: Product[];

    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        this.productsService.getProducts()
            .subscribe(
                (data: any) => console.log(data)
            );
    }

    onSubmit(username: string, email:string) {

    }

}
