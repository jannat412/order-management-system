import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services/config.service';
import {OrderService} from '../../services/order.service';
import {OrderLocalStorageService} from '../../services/order-local-storage.service';

@Component( {
    selector: 'oms-resume',
    templateUrl: './resume.component.html'
} )
export class ResumeComponent implements OnInit, OnDestroy {

    comment: string = '';
    currentOrderDate: string;
    currentDateSubscription: Subscription;
    linesSubscription: Subscription;
    productLines: any[] = [];

    constructor(private orderService: OrderService,
                private configService: ConfigService,
                private orderLocalStorageService: OrderLocalStorageService) {
    }

    // TODO - recuperar comment from firebase and check also if it is different
    // TODO (user could want to erase the message
    saveOrder = () => {
        if (this.comment.trim().length) this.orderService.saveComment(this.comment);
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
                    let ls = this.orderLocalStorageService.getData();
                    if (ls && ls.order === data.$key && ls.data) {
                        this.orderService.setOrder( ls.data );
                    } else {
                        this.orderLocalStorageService.clearData();

                    }

                }
            );
    }

    ngOnDestroy() {
        this.currentDateSubscription.unsubscribe();
        this.linesSubscription.unsubscribe();
    }

}
