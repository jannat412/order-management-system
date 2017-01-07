import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services/config.service';
import {OrderService} from '../../services/order.service';
import {IOrderLine} from '../../models/orderLine';

@Component( {
    selector: 'oms-resume',
    templateUrl: './resume.component.html'
} )
export class ResumeComponent implements OnInit, OnDestroy {

    superTotal: number = 0;
    comment: string = '';
    orderSaved: boolean = false;
    currentOrderDate: string;
    currentDateSubscription: Subscription;
    linesSubscription: Subscription;
    saveSubscription: Subscription;
    totalAmountSubscription: Subscription;
    productLines: IOrderLine[] = [];

    constructor(private orderService: OrderService,
                private configService: ConfigService) {
    }

    // TODO - recuperar comment from firebase and check also if it is different
    // TODO (user could want to erase the message
    saveOrder = () => {
        this.orderService.saveComment( this.comment );
        this.orderService.saveOrder();
    };

    ngOnInit() {
        this.linesSubscription = this.orderService.getOrderLinesByUser()
            .subscribe( data => {
                this.productLines = data;
                this.comment = this.orderService.getComment();
            } );

        this.currentDateSubscription = this.configService.getCurrentOrderDate()
            .subscribe( data => this.currentOrderDate = data.limitDate );

        this.saveSubscription = this.orderService.saveOrderEmitter
            .subscribe( data => this.orderSaved = data.status || false );

        this.totalAmountSubscription = this.orderService.pushTotalAmount
            .subscribe( data => this.superTotal = data );

    }

    ngOnDestroy() {
        this.currentDateSubscription.unsubscribe();
        this.linesSubscription.unsubscribe();
        this.saveSubscription.unsubscribe();
        this.totalAmountSubscription.unsubscribe();
    }

}
