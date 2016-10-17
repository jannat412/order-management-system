import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {IProduct} from '../product';
import {ProductsService} from '../../services/products.service';
import {ITag} from '../tag';

@Component( {
    selector: 'oms-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
} )
export class ProductDetailComponent implements OnInit {
    private pageTitle: string = 'Producte:';
    private product: IProduct;
    private _productsService: ProductsService;
    private errorMessage: string;
    private allTags: ITag[];

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
        return '/product-img/images/' + image;
    }

    goBack(): void {
        this.location.back();
    }

}
