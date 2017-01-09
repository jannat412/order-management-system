import {Component, OnInit, OnDestroy} from '@angular/core';
import {AdminOrderService} from '../../services/admin-order.service';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services/config.service';
import {OrderUtils, ArrayUtils} from '../../../utils/utils';

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
                    (data) => this.products
                        = OrderUtils.reduceOrderByName(
                        ArrayUtils.flattenAll( data )
                    )
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

    ngOnDestroy() {
        this.currentOrderSubscription.unsubscribe();
        this.configActiveSubscription.unsubscribe();
        this.configCurrentOrderSubscription.unsubscribe();
    }

}
