import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {IProduct} from '../product';
import {ITag} from '../tag';
import {ICategory} from '../category';

@Component( {
    selector: 'oms-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css']
} )
export class OrderListComponent implements OnInit {
    allTags: ITag[];
    categories: ICategory[];
    products: IProduct[];
    errorMessage: string;

    listProductTitle: string = 'Llistat de productes';
    listFilter: string = '';

    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        this.productsService.getTags()
            .subscribe(
                (data: ITag[]) => this.allTags = data,
                (error: any)  => this.errorMessage = <any>error

            );
        this.productsService.getCategories()
            .subscribe(
                (data: ICategory[]) => this.categories = data,
                (error: any)  => this.errorMessage = <any>error

            );
        this.productsService.getProducts()
            .subscribe(
                (data: IProduct[]) => this.products = data,
                (error: any)  => this.errorMessage = <any>error
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

    doFilter(str: string): void {
        this.listFilter = str;
    }

}