import {Component, OnInit, OnDestroy} from '@angular/core';
import {AdminOrderService} from '../../services/admin-order.service';
import {IOrderLine} from '../../models/orderLine';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services/config.service';

@Component( {
    selector: 'oms-admin-total-order',
    templateUrl: './admin-total-order.component.html'
} )
export class AdminTotalOrderComponent implements OnInit, OnDestroy {

    products: IOrderLine[] = [];
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
            this.adminOrderService.getCurrentOrdersData()
                .subscribe(
                    (data: IOrderLine[]) => this.products = <IOrderLine[]>data
                );

        this.configActiveSubscription =
            this.configService.getActive()
                .subscribe(
                    (data) => this.isActive = data
                );

        this.configCurrentOrderSubscription =
            this.configService.getCurrentOrderDate()
                .subscribe(
                    (data) => {
                        this.currentOrderDate = data.limitDate;
                    }
                )
    }

    ngOnDestroy() {
        console.log('DESTROY');
        this.currentOrderSubscription.unsubscribe();
        this.configActiveSubscription.unsubscribe();
        this.configCurrentOrderSubscription.unsubscribe();
    }

}
