import {Component, Input, OnInit, OnDestroy, OnChanges} from '@angular/core';
import {IProduct} from '../../../models/product';
import {ProductsService} from '../../../services-module/products.service';
import {Subscription} from 'rxjs/Subscription';
import {ICounterData} from '../../../models/counterData';
import {CategoriesService} from '../../../services-module/categories.service';
import {ICategory} from '../../../models/category';
import {IOrderLine} from '../../../models/orderLine';
import {AdminOrderService} from '../../../services-module/admin-order.service';

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
    @Input() private orderLine: IOrderLine = null;
    @Input() private index: number;
    @Input() private orderKey: string;

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

    private createCounterData = (): ICounterData => {

        return {
            valuePerUnit: this.product.price,
            quantity: this.orderLine.quantity,
            step: 0.05,
            totalMeasurementUnit: '€',
            total: this.orderLine.total
        };
    };

    private updateOrderProductLine = (counterData: any) => {
        this.offset = counterData.quantity - this.orderLine.quantity;
        this.modified = this.offset !== 0;
        this.tempQuantity = this.modified ? counterData.quantity : null;
        this.tempTotal = this.modified ? counterData.total : null;
    };

    private lineOk = () => {
        if (this.modified) {
            this.orderLine.quantity = this.tempQuantity;
            this.orderLine.total = this.tempTotal;
        }
        if (this.orderLine.quantity === 0) {
            this.lineKo();
            return;
        }
        this.orderLine.status = 1;
        this.updateOrder();
    };

    private lineKo = () => {
        this.orderLine.quantity = 0;
        this.orderLine.total = 0;
        this.tempQuantity = null;
        this.tempTotal = null;
        this.orderLine.status = 2;
        this.updateOrder();
    };

    private reset = () => {
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

        this.adminOrderService.setOrderStatus(this.orderKey, false);
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
