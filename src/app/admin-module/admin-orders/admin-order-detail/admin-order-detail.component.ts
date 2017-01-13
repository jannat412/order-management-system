import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {IOrder} from '../../../models/order';
import {AdminOrderService} from '../../../services/admin-order.service';
import {ConfigService} from '../../../services/config.service';
import {IUser} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import { OrderUtils} from '../../../../utils/utils';

@Component( {
    selector: 'oms-admin-order-detail',
    templateUrl: './admin-order-detail.component.html'
} )
export class AdminOrderDetailComponent implements OnInit, OnDestroy {

    private routeParamSubscription: Subscription;
    private configCurrentOrderSubscription: Subscription;
    private order: IOrder;
    private comment: string;
    private total: number;
    private oldTotal: number;
    private orderRevised: boolean = false;
    private currentOrderDate: string;
    private userId: string = null;
    private orderLines: any[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private configService: ConfigService,
                private adminOrderService: AdminOrderService) {
    }

    ngOnInit() {

        this.routeParamSubscription = this.activatedRoute.params
            .flatMap( param => this.adminOrderService.getOrder( param['key'] ) )
            .distinctUntilChanged()
            .subscribe(data => {
                this.order = <IOrder>data;
                this.orderLines = OrderUtils.orderListToArray(this.order.order, true);
                this.userId = data.user;
                this.comment = this.order.comment;
                this.total = OrderUtils.getSuperTotal(this.orderLines, 'total');
                this.oldTotal = OrderUtils.getSuperTotal(this.orderLines, 'oldTotal');
                this.orderRevised = this.orderLines.every((element) => {
                    return element.status !== 0;
                });
            });

        this.configCurrentOrderSubscription =
            this.configService.getCurrentOrderDate()
                .subscribe(
                    (data) => this.currentOrderDate = data.limitDate
                );

    }

    ngOnDestroy() {
        this.routeParamSubscription.unsubscribe();
        this.configCurrentOrderSubscription.unsubscribe();
    }

}
