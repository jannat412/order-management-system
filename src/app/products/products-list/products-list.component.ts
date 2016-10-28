import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {IProduct} from '../product';
import {ITag} from '../tag';
import {ICategory} from '../category';

@Component( {
    selector: 'oms-order-list',
    templateUrl: 'products-list.component.html',
    styleUrls: ['products-list.component.scss']
} )
export class ProductsListComponent implements OnInit {
    private allTags: ITag[];
    private categories: ICategory[];
    private products: IProduct[];
    private errorMessage: string;
    @ViewChild('filteredProducts') filteredProducts: any;

    private listProductTitle: string = 'Llistat de productes';
    private listFilter: string = '';
    private categoryFilter: string = '';
    private activefilter: boolean = true;

    constructor(private productsService: ProductsService) {}

    ngOnInit() {

        this.productsService.getTags()
            .subscribe(
                (data: ITag[]) => this.allTags = <ITag[]>data,
                (error: any)  => this.errorMessage = <any>error
            );
        this.productsService.getCategories()
            .subscribe(
                (data: ICategory[]) => this.categories = <ICategory[]>data,
                (error: any)  => this.errorMessage = <any>error
            );
        this.productsService.getProducts()
            .subscribe(
                (data: IProduct[]) => this.products = <IProduct[]>data,
                (error: any)  => this.errorMessage = <any>error
            );
        console.log(this.filteredProducts);
    }

    getCategoryClass = (category: string): string => {
        for(let cat of this.categories) {
            if (cat.$key === category) {
                return cat.className;
            }
        }
        return '';
    };

    getThumbUrl = (thumb: string): string => {
        let url = `/product-img/thumbs/${thumb}`;
        return url;
    };

    doFilter = (str: string): void => {
        this.listFilter = str;
    };

    doFilterCategory = (str: string): void => {
        this.categoryFilter = str;
    };

    doFilterActive = (active: boolean): void => {
        console.log('doFilterActive');
        console.log(active);
        this.activefilter = active;
    }

}
