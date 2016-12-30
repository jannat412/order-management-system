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
            .map( order => this.db.object( `orders/${order.$key}` ) )
        );

    // orders global by product
    private getOrdersProducts = this.getCurrentOrdersKeys
        .map( orders => orders
            .map( order => this.db.list( `orders/${order.$key}/order` ) )
        );

    constructor(private db: AngularFireDatabase,
                private configService: ConfigService) {
    }

    getCurrentOrdersGlobal = () => {
        return this.getOrdersProducts
            .switchMap( (data) => Observable.combineLatest( data ) );
    };

    getCurrentOrdersByUser = () => {
        return this.getOrders
            .mergeMap( (data) => Observable.combineLatest( data ) );
    }

}
