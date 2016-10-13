import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/products.service';
import {IProduct} from './product';

@Component( {
    selector: 'oms-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css'],
    providers: [ProductsService]
} )
export class OrderListComponent implements OnInit {
    products: IProduct[];
    listProductTitle: string = 'Llistat de productes';
    currentCategory: string = '';
    listFilter: string = '';
    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        this.productsService.getProducts()
            .subscribe(
                (data: any[]) => {
                    console.log(data);
                    this.products = data;
                }
            );
    }

    onSubmit(username: string, email:string) {

    }

}
