import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {IUser} from '../../../models/user';
import {UserService} from '../../../services-module/user.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';
import {AdminOrderService} from '../../../services-module/admin-order.service';

@Component( {
    selector: 'oms-admin-order-cart',
    templateUrl: './admin-order-cart.component.html'
} )
export class AdminOrderCartComponent implements OnChanges, OnDestroy {
    @Input() private total: number = 0;
    @Input() private oldTotal: number = 0;
    @Input() private userId: string;
    @Input() private orderRevised: boolean;
    @Input() private orderKey: string;
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

    constructor(private userService: UserService,
                private adminOrderService: AdminOrderService,
                private router: Router) {
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
    }

    private closeOrder = () => {
        this.router.navigate( ['admin/comandes'] );
    };
}
