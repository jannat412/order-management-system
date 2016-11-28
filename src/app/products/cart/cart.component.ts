import {Component, OnInit, OnDestroy} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services/config.service';
import {OrderLocalStorageService} from '../../services/order-local-storage.service';

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
                private orderLocalStorageService: OrderLocalStorageService) {
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
                this.orderLocalStorageService
                    .saveData(this.currentOrderKey, this.orderService.getOrder());
            }
        );

        this.currentDateSubscription = this.configService.getCurrentOrderDate()
            .subscribe(
                (data) => {
                    this.currentOrderKey = data.$key;
                    this.currentOrderDate = data.limitDate;
                    let ls = this.orderLocalStorageService.getData();
                    if(ls && ls.order === this.currentOrderKey && ls.data) {
                        this.orderService.setOrder(ls.data);
                    } else {
                        this.orderLocalStorageService.clearData();
                    }
                }
            )
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.linesSubscription.unsubscribe();
    }
}
