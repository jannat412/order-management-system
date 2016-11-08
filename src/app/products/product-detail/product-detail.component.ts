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
    private id: number;
    private product: IProduct;
    private errorMessage: string;
    private allCategories: ICategory[];
    private subscription: Subscription;

    constructor(private productsService: ProductsService,
                private categoriesService: CategoriesService,
                private tagsService: TagsService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {

        this.subscription = this.route.params.subscribe(
            (param: any) => this.id = param['id']
        );

        // this.productsService.getProduct( this.id )
        //     .subscribe(
        //         (data: IProduct) => this.product = data,
        //         (error: any) => this.errorMessage = <any>error
        //     );

        // this.tagsService.getTags()
        //     .subscribe(
        //         (data: ITag[]) => this.allTags = <ITag[]>data,
        //         (error: any) => this.errorMessage = <any>error
        //     );

        // this.categoriesService.getCategories()
        //     .subscribe(
        //         (data: ICategory[]) => this.allCategories = <ICategory[]>data,
        //         (error: any) => this.errorMessage = <any>error
        //     );

    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    getImageUrl = (image: string): string => {
        let url = `/product-img/images/${image}`;
        return url;
    };

    // TODO method duplicated (on products-list.component)
    getCategoryClass = (): string => {
        // for (let cat of this.allCategories) {
        //     if (cat.$key === this.product.category) {
        //         return cat.className;
        //     }
        // }
        return '';
    };

}
