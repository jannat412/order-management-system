import {Component, Input, OnChanges, OnDestroy} from '@angular/core';
import {IUser} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component( {
    selector: 'oms-admin-order-cart',
    templateUrl: './admin-order-cart.component.html'
} )
export class AdminOrderCartComponent implements OnChanges, OnDestroy {
    private superTotal: number = 0;
    @Input() userId: string;
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

    constructor(private userService: UserService) {
    }

    ngOnChanges() {
        if (this.userId) {
            this.userSubscription = this.userService
                .getUserData( this.userId )
                .subscribe( user => {
                    console.log( user );
                    this.user = <IUser>user;
                } );
        }
    }

    ngOnDestroy() {
        this.userSubscription.unsubscribe();
    }

    closeOrder = () => {

    };
}
