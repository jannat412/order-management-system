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
    categories: any[];
    products: IProduct[];
    listProductTitle: string = 'Llistat de productes';
    currentCategory: string = '';
    listFilter: string = '';
    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        this.productsService.getCategories()
            .subscribe(
                (data: any[]) => {
                    console.log(data);
                    this.categories = data;
                }
            );
        this.productsService.getProducts()
            .subscribe(
                (data: any[]) => {
                    console.log(data);
                    this.products = data;
                }
            );
    }

    getCategoryClass(product: IProduct): string {
        if(!product.active) {
            return 'disabled';
        }
        for(let cat of this.categories) {
            if (cat.$key === product.category) {
                return cat.className;
            }
        }
        return '';
    }

    onSubmit(username: string, email:string) {

    }

}
