import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {IUser} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs/Subscription';
import {AdminOrderService} from '../../../services/admin-order.service';

@Component( {
    selector: 'oms-admin-order-cart',
    templateUrl: './admin-order-cart.component.html'
} )
export class AdminOrderCartComponent implements OnChanges, OnDestroy {
    @Input() total: any = 0;
    @Input() userId: string;
    @Input() orderKey: string;
    private user: IUser = {
        name: '',
        secondName: '',
        role: '',
        address: '',
        city: '',
        cp: '',
        district: '',
        tel: null
    };
    private userSubscription: Subscription;
    private totalAmountSubscription: Subscription;

    constructor(private userService: UserService,
                private adminOrderService: AdminOrderService) {
    }

    ngOnChanges() {
        if (this.userId) {
            this.userSubscription = this.userService
                .getUserData( this.userId )
                .subscribe( user => this.user = <IUser>user
                );
        }
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
        this.totalAmountSubscription.unsubscribe();
    }

    closeOrder = () => {

    };
}
