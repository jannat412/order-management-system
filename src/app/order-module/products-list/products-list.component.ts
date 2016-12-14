import {Component, OnInit, ViewChild} from '@angular/core';

import {ProductsService} from '../../services/products.service';
import {CategoriesService} from '../../services/categories.service';

import {IProduct} from '../../models/product';
import {ICategory} from '../../models/category';
import {NameFilterInputComponent} from '../name-filter-input/name-filter-input.component';
import {CategoryFilterMenuComponent} from '../category-filter-menu/category-filter-menu.component';


@Component( {
    selector: 'oms-order-list',
    templateUrl: 'products-list.component.html'
} )
export class ProductsListComponent implements OnInit {
    private categories: ICategory[];
    private products: IProduct[];
    private errorMessage: string;

    @ViewChild(NameFilterInputComponent)
    private nameFilterComponent: NameFilterInputComponent;
    @ViewChild(CategoryFilterMenuComponent)
    private categoryFilterComponent: CategoryFilterMenuComponent;

    listProductTitle: string = 'Llistat de productes';
    private listFilter: string = '';
    private categoryFilter: string = '';
    private activeFilter: boolean = true;
    private selectedFilter: boolean = false;

    constructor(private productsService: ProductsService,
                private categoriesService: CategoriesService) {}

    ngOnInit() {

        this.categoriesService.getCategories()
            .subscribe(
                (data: ICategory[]) => this.categories = <ICategory[]>data,
                (error: any) => this.errorMessage = <any>error
            );
        this.productsService.getProducts()
            .subscribe(
                (data: IProduct[]) => this.products = <IProduct[]>data,
                (error: any) => this.errorMessage = <any>error
            );
    }

    getCategoryClass = (category: string): string => {
        for (let cat of this.categories) {
            if (cat.$key === category) {
                return cat.className;
            }
        }
        return '';
    };

    getThumbUrl = (thumb: string): string => {
        return `/assets/product-img/thumbs/${thumb}`;
    };

    doFilter = (str: string) => {
        this.listFilter = str;
    };

    doFilterCategory = (categoryKey: string) => {
        this.categoryFilter = categoryKey;
    };

    doFilterActive = (active: boolean) => {
        this.activeFilter = active;
    };

    doFilterSelected = (selected: boolean) => {
        // reset all filters
        this.nameFilterComponent.clear();
        this.categoryFilterComponent.onFilterCategory('');
        this.categoryFilterComponent.onFilterActive(true);
        this.selectedFilter = selected;
    };

}
