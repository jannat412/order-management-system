import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {IProduct} from '../../../models/product';
import {ProductsService} from '../../../services/products.service';
import {Subscription} from 'rxjs/Subscription';
import {ICounterData} from '../../../models/counterData';

@Component( {
    selector: '.oms-admin-order-detail-list-item',
    templateUrl: './admin-order-detail-item.component.html'
} )
export class AdminOrderDetailItemComponent implements OnInit, OnDestroy {
    @Input() orderLine: any;
    private product: IProduct;
    @Input() index: number;
    private productSubscription: Subscription;

    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        this.productSubscription = this.productsService
            .getProduct( this.orderLine.$key, 'thumbs' )
            .subscribe(
                (product: IProduct) => this.product = <IProduct>product
            );
    }

    ngOnDestroy() {
        this.productSubscription.unsubscribe();
    }

    createCounterData = (): ICounterData => {
        return {
            valuePerUnit: this.product.price,
            quantity: this.orderLine.quantity,
            step: 0.05,
            totalMeasurementUnit: '€',
            total: this.orderLine.total
        };
    };

    updateOrderProductLine = (counterData: any) => {
        console.log(counterData);
    };

}
