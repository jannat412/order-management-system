import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from './config.service';
import {AngularFireDatabase} from 'angularfire2';

@Injectable()
export class AdminOrderService {

    private getCurrentOrdersKeys = this.configService.getCurrentOrderKey()
        .switchMap( currentOrder => this.db.list( `weekOrder/${currentOrder}/orders` ) );

    private getOrdersProducts = this.getCurrentOrdersKeys
        .map( orders => orders
            .map( order => this.db.list( `orders/${order.$key}/order` ) )
        );

    private getOrdersArrays = this.getOrdersProducts
        .switchMap( (data) => Observable.combineLatest( data ) );

    constructor(private db: AngularFireDatabase,
                private configService: ConfigService) {
    }

    getCurrentOrdersData = () => {
        return this.getOrdersArrays;
    };
}
