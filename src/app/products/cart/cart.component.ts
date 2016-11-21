import {Component, OnInit, OnDestroy} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Subscription} from 'rxjs';
import {ConfigService} from '../../services/config.service';

@Component( {
    selector: 'oms-cart',
    templateUrl: './cart.component.html'
} )
export class CartComponent implements OnInit, OnDestroy {
    superTotal: number = 0;
    subscription: Subscription;
    linesSubscription: Subscription;
    currentDateSubscription: Subscription;
    productLines: any[] = [];
    currentOrderDate: string;

    constructor(private orderService: OrderService,
                private configService: ConfigService) {
    }

    ngOnInit() {
        this.superTotal = this.orderService.getTotalAmount();
        this.productLines = this.orderService.orderListToArray();

        this.subscription = this.orderService.pushTotalAmount.subscribe(
            data => this.superTotal = data
        );
        this.linesSubscription = this.orderService.emittedOrder.subscribe(
            data => this.productLines = data
        );

        this.currentDateSubscription = this.configService.getCurrentOrderDate()
            .subscribe(
                (data) => {
                    this.currentOrderDate = data.limitDate;
                }
            )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.linesSubscription.unsubscribe();
    }
}
