import {Component, OnInit} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {IProduct} from '../product';
import {ITag} from '../tag';
import {ICategory} from '../category';

@Component( {
    selector: 'oms-order-list',
    templateUrl: './order-list.component.html',
    styleUrls: ['./order-list.component.css'],
    providers: [ProductsService]
} )
export class OrderListComponent implements OnInit {
    allTags: ITag[];
    categories: ICategory[];
    products: IProduct[];

    listProductTitle: string = 'Llistat de productes';
    listFilter: string = '';

    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        this.productsService.getTags()
            .subscribe(
                (data: any[]) => {
                    this.allTags = data;
                }
            );
        this.productsService.getCategories()
            .subscribe(
                (data: any[]) => {
                    this.categories = data;
                }
            );
        this.productsService.getProducts()
            .subscribe(
                (data: any[]) => {
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

    doFilter(str: string): void {
        this.listFilter = str;
    }

}
