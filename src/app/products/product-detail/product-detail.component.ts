import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';

import {ProductsService} from '../../services/products.service';
import {CategoriesService} from '../../services/categories.service';
import {TagsService} from '../../services/tags.service';

import {IProduct} from '../../models/product';
import {ITag} from '../../models/tag';
import {ICategory} from '../../models/category';

@Component( {
    selector: 'oms-product-detail',
    templateUrl: './product-detail.component.html'
} )
export class ProductDetailComponent implements OnInit, OnDestroy {
    private pageTitle: string = 'Producte:';
    private key: string;
    private product: IProduct;
    private category: ICategory;
    private tags: ITag[];
    private errorMessage: string;
    private subscription: Subscription;

    constructor(private productsService: ProductsService,
                private categoriesService: CategoriesService,
                private tagsService: TagsService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {

        this.subscription = this.route.params.subscribe(
            (param: any) => this.key = param['key']
        );

        this.productsService.getProduct( this.key )
            .subscribe(
                (data: IProduct) => this.product = data,
                (error: any) => this.errorMessage = <any>error
            );

        this.tagsService.getTagsForProduct( this.product.$key )
            .subscribe(
                (data: ITag[]) => this.tags = <ITag[]>data,
                (error: any) => this.errorMessage = <any>error
            );

        this.categoriesService.getCategoryForProduct( this.product.categoryKey )
            .subscribe(
                (data: ICategory) => this.category = <ICategory>data,
                (error: any) => this.errorMessage = <any>error
            );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getImageUrl = (image: string): string => {
        let url = `/product-img/images/${image}`;
        return url;
    };


}
