import {Component, OnInit, OnDestroy} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Subscription} from 'rxjs';
import {ConfigService} from '../../services/config.service';
import {LocalStorageService} from '../../services/local-storage.service';

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
    currentOrderKey: string;

    constructor(private orderService: OrderService,
                private configService: ConfigService,
                private localStorageService: LocalStorageService) {
    }

    ngOnInit() {

        this.superTotal = this.orderService.getTotalAmount();
        this.productLines = this.orderService.orderListToArray();

        this.subscription = this.orderService.pushTotalAmount.subscribe(
            data => this.superTotal = data
        );
        this.linesSubscription = this.orderService.emittedOrder.subscribe(
            data => {
                this.productLines = data;
                this.localStorageService
                    .saveValue(this.currentOrderKey, this.orderService.getOrder());
            }
        );

        this.currentDateSubscription = this.configService.getCurrentOrderDate()
            .subscribe(
                (data) => {
                    this.currentOrderKey = data.$key;
                    this.currentOrderDate = data.limitDate;
                    let ls = this.localStorageService
                        .getValue(this.currentOrderKey);
                    if(ls) {
                        this.orderService.setOrder(ls);
                    }
                }
            )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.linesSubscription.unsubscribe();
    }
}
