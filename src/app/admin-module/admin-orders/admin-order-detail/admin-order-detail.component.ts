import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {IOrder} from '../../../models/order';
import {AdminOrderService} from '../../../services-module/admin-order.service';
import {ConfigService} from '../../../services-module/config.service';
import {IUser} from '../../../models/user';
import {UserService} from '../../../services-module/user.service';
import {OrderUtils} from '../../../../utils/utils';
import {Location} from '@angular/common';

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
    private usedProducts: string[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private configService: ConfigService,
                private adminOrderService: AdminOrderService,
                private location: Location) {
    }

    ngOnInit() {

        this.routeParamSubscription = this.activatedRoute.params
            .flatMap( param => this.adminOrderService.getOrder( param['key'] ) )
            .distinctUntilChanged()
            .subscribe( data => {
                this.order = <IOrder>data;

                // used product keys
                let orderProducts = this.order.order;
                this.usedProducts = Object.keys(orderProducts);
                this.orderLines = OrderUtils.orderListToArray( orderProducts, true );

                this.userId = data.user;
                this.comment = this.order.comment;
                this.total = OrderUtils.getSuperTotal( this.orderLines, 'total' );
                this.oldTotal = OrderUtils.getSuperTotal( this.orderLines, 'oldTotal' );
                // revision done for current order
                this.orderRevised = this.orderLines.every( (element) => {
                    return element.status !== 0;
                } );
                this.adminOrderService.setOrderStatus(this.order['$key'], this.orderRevised);

            } );

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

    goBack = () => {
        this.location.back();
    };

}
