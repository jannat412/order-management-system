import {Component, OnInit, OnDestroy} from '@angular/core';
import {AdminOrderService} from '../../services/admin-order.service';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services/config.service';
import {ArrayUtils} from '../../../utils/array.utils';

@Component( {
    selector: 'oms-admin-total-order',
    templateUrl: './admin-total-order.component.html'
} )
export class AdminTotalOrderComponent implements OnInit, OnDestroy {

    products;
    currentOrderDate: string;
    isActive: boolean = false;
    configActiveSubscription: Subscription;
    configCurrentOrderSubscription: Subscription;
    currentOrderSubscription: Subscription;

    constructor(private adminOrderService: AdminOrderService,
                private configService: ConfigService) {
    }

    ngOnInit() {
        this.currentOrderSubscription =
            this.adminOrderService.getCurrentOrdersGlobal()
                .subscribe(
                    (data) => this.products = this.formatProducts(data)
                );

        this.configActiveSubscription =
            this.configService.getActive()
                .subscribe(
                    (data) => this.isActive = data
                );

        this.configCurrentOrderSubscription =
            this.configService.getCurrentOrderDate()
                .subscribe(
                    (data) => this.currentOrderDate = data.limitDate
                )
    }

    // TODO refactor this
    private formatProducts = (orders) => {
        const tempProducts = {};

        orders.forEach( (order) => {
            order.forEach( (product) => {
                this.constructOrder(product, tempProducts);
            } );
        } );
        return ArrayUtils.orderListToArray(tempProducts);
    };

    private constructOrder = (el, products) => {
        if (products[el.$key]) {
            const item = products[el.$key];
            item.quantity += el.quantity * 1e2 / 1e2;
            item.total += el.total * 1e2 / 1e2;
        } else {
            products[el.$key] = {
                name: el.name,
                quantity: el.quantity,
                unity: el.unity,
                total: el.total
            };
        }
    };

    ngOnDestroy() {
        console.log( 'DESTROY' );
        this.currentOrderSubscription.unsubscribe();
        this.configActiveSubscription.unsubscribe();
        this.configCurrentOrderSubscription.unsubscribe();
    }

}
