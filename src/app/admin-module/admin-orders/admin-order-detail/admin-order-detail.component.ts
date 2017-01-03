import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {IOrder} from '../../../models/order';
import {AdminOrderService} from '../../../services/admin-order.service';
import {ConfigService} from '../../../services/config.service';
import {IUser} from '../../../models/user';
import {UserService} from '../../../services/user.service';

@Component( {
    selector: 'oms-admin-order-detail',
    templateUrl: './admin-order-detail.component.html'
} )
export class AdminOrderDetailComponent implements OnInit, OnDestroy {

    private routeParamSubscription: Subscription;
    private configCurrentOrderSubscription: Subscription;
    private key: string = 'loading';
    private order: IOrder;
    private currentOrderDate: string;
    private user: IUser;

    constructor(private activatedRoute: ActivatedRoute,
                private configService: ConfigService,
                private adminOrderService: AdminOrderService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.routeParamSubscription = this.activatedRoute.params
            .flatMap( param => this.adminOrderService.getOrder( param['key'] ) )
            .flatMap(data => {
                this.order = <IOrder>data;
                return this.userService.getUserData( data.user )
            })
            .subscribe(
                (user: IUser) => this.user = <IUser>user
            );

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
