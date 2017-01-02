import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

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

    private key: string;
    private product: IProduct;
    private category: ICategory;
    private tags: ITag[];
    private errorMessage: string;
    private routeParamSubscription: Subscription;
    private productSubscription: Subscription;
    private tagSubscription: Subscription;
    private categorySubscription: Subscription;

    constructor(private productsService: ProductsService,
                private categoriesService: CategoriesService,
                private tagsService: TagsService,
                private activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.routeParamSubscription = this.activatedRoute.params
            .map( param => param['key'] )
            .subscribe(
                (key) => {
                    this.key = key;
                    this.getProduct();
                    this.getTags();
                }
            );
    }

    ngOnDestroy() {
        this.routeParamSubscription.unsubscribe();
        this.productSubscription.unsubscribe();
        this.tagSubscription.unsubscribe();
        this.categorySubscription.unsubscribe();
    }

    getProduct = () => {
        this.productSubscription = this.productsService
            .getProduct( this.key )
            .subscribe(
                (data: IProduct) => {
                    this.product = data;
                    this.getCategory();
                },
                (error) => this.errorMessage = error
            );
    };

    getCategory = () => {
        this.categorySubscription = this.categoriesService
            .getCategoryForProduct( this.product.categoryKey )
            .subscribe(
                (data: ICategory) => this.category = <ICategory>data,
                (error) => this.errorMessage = error
            );
    };

    getTags = () => {
        this.tagSubscription = this.tagsService
            .getTagsForProduct( this.key )
            .subscribe(
                (data: ITag[]) => this.tags = <ITag[]>data,
                (error) => this.errorMessage = error
            );
    };

}
