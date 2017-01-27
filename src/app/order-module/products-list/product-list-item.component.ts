import {Component, Input, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {OrderService} from '../../services-module/order.service';
import {CategoriesService} from '../../services-module/categories.service';
import {IProduct, IOrderLine} from '../../models/item';
import {ICategory} from '../../models/category';
import {ICounterData} from '../../models/counterData';

@Component( {
    selector: '.oms-product-list-item',
    templateUrl: './product-list-item.component.html'
} )
export class ProductListItemComponent implements OnInit, OnDestroy {
    @Input() private product: IProduct;
    @Input() private productOrderLine: IOrderLine;
    private category: ICategory;
    private categorySubscription: Subscription;
    private categoryName: string;

    constructor(private categoriesService: CategoriesService,
                private orderService: OrderService) {
    }

    ngOnInit() {
        this.categorySubscription = this.categoriesService
            .getCategoryForProduct( this.product.categoryKey )
            .subscribe(
                (data: ICategory) => {
                    this.category = <ICategory>data;
                    this.categoryName = this.category.className;
                }
            );
    }

    ngOnDestroy() {
        this.categorySubscription.unsubscribe();
    }

    private createCounterData = (): ICounterData => {
        this.isProductSelected( this.productOrderLine.quantity );
        return {
            valuePerUnit: this.product.price,
            quantity: this.productOrderLine.quantity,
            step: this.product.step,
            totalMeasurementUnit: '€',
            total: this.productOrderLine.total
        };
    };

    private updateOrderProductLine = (counterData: any) => {
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

    private isProductSelected = (quantity: number) => {
        this.product.selected = quantity > 0;
    };

    private setRowClasses = () => {
        return {
            [this.categoryName]: true,
            'selected': this.product.selected,
            'enabled': this.product.active
        }
    };

}
