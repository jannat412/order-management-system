import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from './config.service';
import {AngularFireDatabase} from 'angularfire2';

@Injectable()
export class AdminOrderService {

    private getCurrentOrdersKeys = this.configService.getCurrentOrderKey()
        .switchMap( currentOrder => this.db.list( `weekOrder/${currentOrder}/orders` ) );

    // orders by user
    private getOrders = this.getCurrentOrdersKeys
        .map( orders => orders
            .map( order => this.db.list( `orders/${order.$key}` ) )
        );

    // orders global by product
    private getOrdersProducts = this.getCurrentOrdersKeys
        .map( orders => orders
            .map( order => this.db.list( `orders/${order.$key}/order` ) )
        );

    constructor(private db: AngularFireDatabase,
                private configService: ConfigService) {
    }

    private orderToArray = (stream: Observable) => stream
            .switchMap( (data) => Observable.combineLatest( data ) );

    getCurrentOrdersGlobal = () => {
        return this.orderToArray(this.getOrdersProducts);
    };

    getCurrentOrdersByUser = () => {
        return this.orderToArray(this.getOrders);
    }

}
