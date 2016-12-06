import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services/config.service';
import {OrderService} from '../../services/order.service';

@Component( {
    selector: 'oms-resume',
    templateUrl: './resume.component.html'
} )
export class ResumeComponent implements OnInit, OnDestroy {

    comment: string = '';
    orderSaved: boolean = false;
    currentOrderDate: string;
    currentDateSubscription: Subscription;
    linesSubscription: Subscription;
    saveSubscription: Subscription;
    productLines: any[] = [];

    constructor(private orderService: OrderService,
                private configService: ConfigService) {
    }

    // TODO - recuperar comment from firebase and check also if it is different
    // TODO (user could want to erase the message
    saveOrder = () => {
        if (this.comment.trim().length) this.orderService.saveComment( this.comment );
        this.orderService.saveOrder();
    };

    ngOnInit() {

        this.linesSubscription = this.orderService.emittedOrder.subscribe(
            data => this.productLines = data
        );
        this.currentDateSubscription = this.configService.getCurrentOrderDate()
            .subscribe(
                (data) => {
                    this.currentOrderDate = data.limitDate;
                    this.orderService.getOrderFromLStorage( data.$key );
                }
            );

        this.saveSubscription = this.orderService.saveOrderEmitter.subscribe(
            (data) => this.orderSaved = data.status || false
        );
    }

    ngOnDestroy() {
        this.currentDateSubscription.unsubscribe();
        this.linesSubscription.unsubscribe();
        this.saveSubscription.unsubscribe();
    }

}
