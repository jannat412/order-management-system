import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from './config.service';
import {AngularFireDatabase} from 'angularfire2';
import {ArrayUtils} from '../../utils/array.utils';

@Injectable()
export class AdminOrderService {

    order = {};

    constructor(private db: AngularFireDatabase,
                private configService: ConfigService) {
    }

    getCurrentOrdersData = (): Observable<any[]> => {
        return this.getCurrentOrdersKeys()
            .map( orders => {
                return orders.map( order => {
                    return this.db.list( `orders/${order.$key}/order` );
                } );
            } )
            .flatMap( (data) => {
                console.log(data);
                return Observable.combineLatest( data );
            } )
            .map( data => {
                console.log(data);
                return data.map( subdata => {
                    console.log(subdata);
                    return subdata.map(subsubdata => {
                        console.log(subsubdata);
                        this.constructOrder(subsubdata);
                    });
                } );

            } )
            .map( () => ArrayUtils.orderListToArray( this.order ) );

    };

    private getCurrentOrdersKeys = (): Observable<any[]> => {
        return this.configService.getCurrentOrderKey()
            .map( currentOrder => {
                return this.db.list( `weekOrder/${currentOrder}/orders` );
            } )
            .flatMap( data => data );
    };

    private constructOrder = (el) => {
        if (this.order[el.$key]) {
            const item = this.order[el.$key];
            item.quantity += el.quantity * 1e2 / 1e2;
            item.total += el.total * 1e2 / 1e2;
        } else {
            this.order[el.$key] = {
                name: el.name,
                quantity: el.quantity,
                unity: el.unity,
                total: el.total
            };
        }
    };
}
