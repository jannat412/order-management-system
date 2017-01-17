import {Component, OnInit, Input} from '@angular/core';
import {IOrder} from '../../models/order';
import {IOrderLine} from '../../models/orderLine';
import {IUser} from '../../models/user';
import {UserService} from '../../services-module/user.service';
import {Subscription} from 'rxjs/Subscription';

@Component( {
    selector: '.oms-admin-order-row',
    templateUrl: './admin-order-row.component.html'
} )
export class AdminOrderRowComponent implements OnInit {

    @Input() order: IOrder;
    @Input() index: number;
    totalAmount: number = 0;
    products: IOrderLine[] = [];
    user: IUser;
    userSubscription: Subscription;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.userSubscription =
            this.userService.getUserData( this.order.user )
                .subscribe(
                    (user: IUser) => this.user = <IUser>user
                );

        this.totalAmount = this.calculateTotalAmount();
        this.products = this.getProducts();
    }

    private calculateTotalAmount = (): number => {
        const orderItems = this.order.order;
        return Math.round( Object.keys( orderItems ).reduce( (sum, key) => {
                    return sum + orderItems[key].total;
                }, 0 ) * 1e2 ) / 1e2;
    };

    private getProducts = (): IOrderLine[] => {
        const keys = [];
        const data = this.order.order;
        for (let item in data) {
            if (data.hasOwnProperty( item )) {
                keys.push( data[item] );
            }
        }
        return keys;
    };
}
