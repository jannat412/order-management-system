import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../../services-module/order.service';
import {CategoriesService} from '../../services-module/categories.service';
import {IProduct} from '../../models/product';
import {ICategory} from '../../models/category';
import {IOrderLine} from '../../models/orderLine';
import {ICounterData} from '../../models/counterData';

@Component( {
    selector: '.oms-product-list-item',
    templateUrl: './product-list-item.component.html'
} )
export class ProductListItemComponent implements OnInit, OnDestroy {
    @Input() product: IProduct;
    @Input() productOrderLine: IOrderLine;
    private category: ICategory;
    private categorySubscription: Subscription;

    constructor(private categoriesService: CategoriesService,
                private orderService: OrderService) {
    }
F
    ngOnInit() {
        this.categorySubscription = this.categoriesService
            .getCategoryForProduct( this.product.categoryKey )
            .subscribe(
                (data: ICategory) => this.category = <ICategory>data
            );
    }

    ngOnDestroy() {
        this.categorySubscription.unsubscribe();
    }

    createCounterData = (): ICounterData => {
        this.isProductSelected( this.productOrderLine.quantity );
        return {
            valuePerUnit: this.product.price,
            quantity: this.productOrderLine.quantity,
            step: this.product.step,
            totalMeasurementUnit: '€',
            total: this.productOrderLine.total
        };
    };

    updateOrderProductLine = (counterData: any) => {
        this.isProductSelected( counterData.quantity );
        this.orderService.addProductLine( {
            $key: this.product.$key,
            name: this.product.name,
            price: this.product.price,
            quantity: counterData.quantity,
            unity: this.product.unity,
            total: counterData.total
        } );
    };

    isProductSelected = (quantity: number) => {
        this.product.selected = quantity > 0;
    }

}
