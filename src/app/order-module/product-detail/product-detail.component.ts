import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {ProductsService} from '../../services-module/products.service';
import {CategoriesService} from '../../services-module/categories.service';
import {TagsService} from '../../services-module/tags.service';

import {IProduct} from '../../models/product';
import {ITag} from '../../models/tag';
import {ICategory} from '../../models/category';
import {ICounterData} from '../../models/counterData';
import {OrderService} from '../../services-module/order.service';
import {IOrderLine} from '../../models/orderLine';
import {Location} from '@angular/common';

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
    private userOrderProduct: IOrderLine = {quantity: 0, total: 0};
    private routeParamSubscription: Subscription;
    private productSubscription: Subscription;
    private tagSubscription: Subscription;
    private categorySubscription: Subscription;
    private orderLineSubscription: Subscription;

    constructor(private productsService: ProductsService,
                private categoriesService: CategoriesService,
                private tagsService: TagsService,
                private activatedRoute: ActivatedRoute,
                private orderService: OrderService,
                private location: Location) {
    }

    ngOnInit() {
        this.routeParamSubscription = this.activatedRoute.params
            .map( param => param['key'] )
            .subscribe(
                (key) => {
                    this.key = key;
                    this.getProduct();
                    this.getTags();
                    this.getOrderLine();
                }
            );
    }

    ngOnDestroy() {
        this.routeParamSubscription.unsubscribe();
        this.productSubscription.unsubscribe();
        this.tagSubscription.unsubscribe();
        this.categorySubscription.unsubscribe();
        this.orderLineSubscription.unsubscribe();
    }

    private getOrderLine = () => {
        this.orderLineSubscription = this.orderService
            .getProductOrderLine( this.key ).subscribe(
                (userOrderProduct: IOrderLine) => {
                    this.userOrderProduct = <IOrderLine>userOrderProduct
                }

            );
    };

    private getProduct = () => {
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

    private getCategory = () => {
        this.categorySubscription = this.categoriesService
            .getCategoryForProduct( this.product.categoryKey )
            .subscribe(
                (data: ICategory) => this.category = <ICategory>data,
                (error) => this.errorMessage = error
            );
    };

    private getTags = () => {
        this.tagSubscription = this.tagsService
            .getTagsForProduct( this.key )
            .subscribe(
                (data: ITag[]) => this.tags = <ITag[]>data,
                (error) => this.errorMessage = error
            );
    };

    private createCounterData = (): ICounterData => {
        return {
            valuePerUnit: this.product.price,
            quantity: this.userOrderProduct.quantity || 0,
            step: this.product.step,
            totalMeasurementUnit: '€',
            total: this.userOrderProduct.total || 0
        };
    };

    private updateOrderProductLine = (counterData: any) => {
        this.orderService.addProductLine( {
            $key: this.product.$key,
            name: this.product.name,
            price: this.product.price,
            quantity: counterData.quantity,
            unity: this.product.unity,
            total: counterData.total
        } );
    };

    private goBack = () => {
        this.location.back();
    };

}
