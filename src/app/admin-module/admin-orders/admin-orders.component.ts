import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {IOrder} from '../../models/order';
import {ConfigService} from '../../services-module/config.service';
import {AdminOrderService} from '../../services-module/admin-order.service';
import {Router} from '@angular/router';

@Component( {
    selector: 'oms-admin-orders',
    templateUrl: './admin-orders.component.html'
} )
export class AdminOrdersComponent implements OnInit, OnDestroy {

    private orders: IOrder[];
    private currentOrderDate: string;
    private isActive: boolean = false;
    private currentOrdersSubscription: Subscription;
    private configActiveSubscription: Subscription;
    private configCurrentOrderSubscription: Subscription;

    constructor(private router:Router,
                private adminOrderService: AdminOrderService,
                private configService: ConfigService) {
    }

    ngOnInit() {
        this.currentOrdersSubscription =
            this.adminOrderService.getCurrentOrdersByUser()
                .subscribe(
                    (data: IOrder[]) => this.orders = <IOrder[]>data
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
        this.currentOrdersSubscription.unsubscribe();
        this.configActiveSubscription.unsubscribe();
        this.configCurrentOrderSubscription.unsubscribe();
    }

    private gotoOrderDetail = (key: string): void => {
        this.router.navigate(['admin/comandes', key]);
    };

}
