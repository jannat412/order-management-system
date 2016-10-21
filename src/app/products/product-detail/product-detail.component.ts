import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {IProduct} from '../product';
import {ProductsService} from '../../services/products.service';
import {ITag} from '../tag';
import {ICategory} from '../category';
import {Subscription} from 'rxjs';

@Component( {
    selector: 'oms-product-detail',
    templateUrl: './product-detail.component.html'
} )
export class ProductDetailComponent implements OnInit, OnDestroy {
    private pageTitle: string = 'Producte:';
    private id: number;
    private product: IProduct;
    private errorMessage: string;
    private allTags: ITag[];
    private allCategories: ICategory[];
    private subscription: Subscription;

    constructor(private productsService: ProductsService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {

        this.subscription = this.route.params.subscribe(
            (param: any) => this.id = param['id']
        );
        this.productsService.getProduct( this.id )
            .subscribe(
                (data: IProduct) => this.product = data,
                (error: any) => this.errorMessage = <any>error
            );

        this.productsService.getTags()
            .subscribe(
                (data: ITag[]) => this.allTags = <ITag[]>data,
                (error: any) => this.errorMessage = <any>error
            );
        this.productsService.getCategories()
            .subscribe(
                (data: ICategory[]) => this.allCategories = <ICategory[]>data,
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

    getCategoryClass = (): string => {
        for (let cat of this.allCategories) {
            if (cat.$key === this.product.category) {
                return cat.className;
            }
        }
        return '';
    };

}
