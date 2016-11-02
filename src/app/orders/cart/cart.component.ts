import {Component, OnInit, OnDestroy} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Subscription} from 'rxjs';

@Component( {
    selector: 'oms-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss']
} )
export class CartComponent implements OnInit, OnDestroy {
    superTotal: number = 0;
    subscription: Subscription;

    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
        this.superTotal = this.orderService.getTotalAmount();
        this.subscription = this.orderService.pushTotalAmount.subscribe(
            data => this.superTotal = data
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
