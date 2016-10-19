import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {IProduct} from '../product';
import {ProductsService} from '../../services/products.service';
import {ITag} from '../tag';
import {ICategory} from '../category';

@Component( {
    selector: 'oms-product-detail',
    templateUrl: './product-detail.component.html'
} )
export class ProductDetailComponent implements OnInit {
    private pageTitle: string = 'Producte:';
    private product: IProduct;
    private errorMessage: string;
    private allTags: ITag[];
    private allCategories: ICategory[];

    constructor(private productsService: ProductsService,
                private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        this.productsService.getTags()
            .subscribe(
                (data: ITag[]) => this.allTags = <ITag[]>data,
                (error: any)  => this.errorMessage = <any>error
            );
        this.productsService.getCategories()
            .subscribe(
                (data: ICategory[]) => this.allCategories = <ICategory[]>data,
                (error: any)  => this.errorMessage = <any>error
            );
        this.route.params.forEach( (params: Params) => {
            let id = +params['id'];
            this.productsService.getProduct( id )
                .subscribe(
                    (data: IProduct) => this.product = data,
                    (error: any) => this.errorMessage = <any>error
                );
        } )
    }

    getImageUrl(image: string): string {
        let url = `/product-img/images/${image}`;
        return url;
    }

    getCategoryClass(): string {
        for(let cat of this.allCategories) {
            if (cat.$key === this.product.category) {
                return cat.className;
            }
        }
        return '';
    }

    goBack(): void {
        this.location.back();
    }

}
