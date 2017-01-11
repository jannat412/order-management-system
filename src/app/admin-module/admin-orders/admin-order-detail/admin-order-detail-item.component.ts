import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {IProduct} from '../../../models/product';
import {ProductsService} from '../../../services/products.service';
import {Subscription} from 'rxjs/Subscription';
import {ICounterData} from '../../../models/counterData';
import {CategoriesService} from '../../../services/categories.service';
import {ICategory} from '../../../models/category';
import {IOrderLine} from '../../../models/orderLine';
import {AdminOrderService} from '../../../services/admin-order.service';

@Component( {
    selector: '.oms-admin-order-detail-list-item',
    templateUrl: './admin-order-detail-item.component.html'
} )
export class AdminOrderDetailItemComponent implements OnInit, OnDestroy {
    @Input() orderLine: IOrderLine;
    @Input() index: number;
    @Input() orderKey: string;

    private product: IProduct;
    private category: ICategory;

    private productSubscription: Subscription;
    private categorySubscription: Subscription;

    private offset: number = null;
    private tempQuantity: number = null;
    private tempTotal: number = null;
    private ok: boolean = false;
    private available: boolean = true;
    private modified: boolean = false;

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
        this.offset = counterData.total - this.orderLine.total;
        this.modified = this.offset !== 0;
        this.tempQuantity = this.modified ? counterData.quantity : null;
        this.tempTotal = this.modified ? counterData.total : null;

    };

    lineOk = () => {
        this.ok = true;
        if (this.modified) {
            this.orderLine.oldQuantity = this.orderLine.quantity;
            this.orderLine.oldTotal = this.orderLine.total;
            this.orderLine.quantity = this.tempQuantity;
            this.orderLine.total = this.tempTotal;
            this.updateOrder();
        }
    };

    lineKo = () => {
        this.ok = true;
        this.available = false;
        this.orderLine.oldQuantity = this.orderLine.quantity;
        this.orderLine.oldTotal = this.orderLine.total;
        this.orderLine.quantity = 0;
        this.orderLine.total = 0;
        this.tempQuantity = null;
        this.tempTotal = null;
        this.updateOrder();
    };

    reset = () => {
        if (this.modified) {
            this.orderLine.quantity = this.orderLine.oldQuantity;
            this.orderLine.total = this.orderLine.oldTotal;
            delete this.orderLine.oldQuantity;
            delete this.orderLine.oldTotal;
            this.updateOrder();
        }
        this.ok = false;
        this.available = true;
        this.modified = false;
        this.tempQuantity = null;
        this.tempTotal = null;
        this.offset = null;
    };

    private updateOrder = () => {
        this.adminOrderService.updateOrder(this.orderKey, this.orderLine);
    };

}
