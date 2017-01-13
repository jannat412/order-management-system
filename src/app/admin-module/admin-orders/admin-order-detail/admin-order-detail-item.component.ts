import {Component, Input, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {IProduct} from '../../../models/product';
import {ProductsService} from '../../../services/products.service';
import {Subscription} from 'rxjs/Subscription';
import {ICounterData} from '../../../models/counterData';
import {CategoriesService} from '../../../services/categories.service';
import {ICategory} from '../../../models/category';
import {IOrderLine} from '../../../models/orderLine';
import {AdminOrderService} from '../../../services/admin-order.service';

enum Status {
    init,
    accepted,
    rejected
}

@Component( {
    selector: '.oms-admin-order-detail-list-item',
    templateUrl: './admin-order-detail-item.component.html'
} )
export class AdminOrderDetailItemComponent implements OnInit, OnChanges, OnDestroy {
    @Input() orderLine: IOrderLine = null;
    @Input() index: number;
    @Input() orderKey: string;

    private product: IProduct;
    private category: ICategory;

    private productSubscription: Subscription;
    private categorySubscription: Subscription;

    private offset: number = null;
    private tempQuantity: number = null;
    private tempTotal: number = null;
    private modified: boolean = false;
    private status = Status[0];

    constructor(private productsService: ProductsService,
                private categoriesService: CategoriesService,
                private adminOrderService: AdminOrderService) {
    }

    ngOnInit() {
        this.productSubscription = this.productsService
            .getProduct( this.orderLine.$key, 'thumbs' )
            .subscribe(
                (product: IProduct) => {
                    this.product = <IProduct>product;
                    this.categorySubscription = this.categoriesService.getCategoryForProduct( this.product.categoryKey )
                        .subscribe(
                            (data: ICategory) => this.category = <ICategory>data
                        );
                }
            );
    }

    ngOnChanges() {
        this.status = Status[this.orderLine.status];
    }

    ngOnDestroy() {
        this.productSubscription.unsubscribe();
        this.categorySubscription.unsubscribe();
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
        this.offset = counterData.quantity - this.orderLine.quantity;
        this.modified = this.offset !== 0;
        this.tempQuantity = this.modified ? counterData.quantity : null;
        this.tempTotal = this.modified ? counterData.total : null;
    };

    lineOk = () => {
        if (this.modified) {
            this.orderLine.quantity = this.tempQuantity;
            this.orderLine.total = this.tempTotal;
        }
        this.orderLine.status = 1;
        this.updateOrder();
    };

    lineKo = () => {
        this.orderLine.quantity = 0;
        this.orderLine.total = 0;
        this.tempQuantity = null;
        this.tempTotal = null;
        this.orderLine.status = 2;
        this.updateOrder();
    };

    reset = () => {
        if (this.modified) {
            this.orderLine.quantity = this.orderLine.oldQuantity;
            this.orderLine.total = this.orderLine.oldTotal;
        }
        this.orderLine.status = 0;
        this.updateOrder();
        this.modified = false;
        this.tempQuantity = null;
        this.tempTotal = null;
        this.offset = null;
    };

    private updateOrder = () => {
        this.adminOrderService
            .updateOrder( this.orderKey, this.orderLine.$key, {
                quantity: this.orderLine.quantity,
                total: this.orderLine.total,
                status: this.orderLine.status
            } );
    };

}
