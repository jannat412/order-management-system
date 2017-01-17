import {Component, OnInit, OnDestroy} from '@angular/core';
import {OrderService} from '../../services-module/order.service';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services-module/config.service';
import {Router} from '@angular/router';
import {IOrderLine} from '../../models/orderLine';

@Component( {
    selector: 'oms-cart',
    templateUrl: './cart.component.html'
} )
export class CartComponent implements OnInit, OnDestroy {

    private superTotal: number = 0;
    private productLines: IOrderLine[] = [];
    private currentOrderDate: string;
    private currentOrderKey: string;
    private totalAmountSubscription: Subscription;
    private linesSubscription: Subscription;
    private currentDateSubscription: Subscription;
    private orderInitSubscription: Subscription;

    constructor(private orderService: OrderService,
                private configService: ConfigService,
                private router: Router) {
    }

    goToResume = () => {
        this.router.navigate( ['comanda/resum'] );
    };

    ngOnInit() {
        this.totalAmountSubscription = this.orderService.pushTotalAmount
            .subscribe(
                (data) => this.superTotal = data
            );

        this.orderInitSubscription = this.orderService.getOrderLinesByUser()
            .subscribe(
                (data) => this.productLines = data
            );

        this.linesSubscription = this.orderService.emittedOrder
            .subscribe(
                (data) => this.productLines = data
            );

        this.currentDateSubscription = this.configService.getCurrentOrderDate()
            .subscribe(
                (data) => {
                    this.currentOrderKey = data.$key;
                    this.currentOrderDate = data.limitDate;
                }
            );

    }

    ngOnDestroy() {
        this.totalAmountSubscription.unsubscribe();
        this.linesSubscription.unsubscribe();
        this.currentDateSubscription.unsubscribe();
        this.orderInitSubscription.unsubscribe();
    }
}
