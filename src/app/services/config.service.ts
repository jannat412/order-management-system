import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs';

@Injectable()
export class ConfigService {

    constructor(private db: AngularFireDatabase) {
    }

    getActive(): Observable<any> {
        return this.db.object( 'config/active' )
            .map( active => active.$value );
    }

    setActive(val: boolean) {
        const activeNode = this.db.object( '/config' );
        activeNode.update( {
            active: val
        } );
        if (val) {
            this.createCurrentOrder();
        }
        // check if the order exists
        // if not - create new order with next thusday date
        // update current order in config
    }

    createCurrentOrder() {

        const currentOrder = this.db.object( '/config/currentOrder' )
            .map( currentOrder => {
                let nextThursday = this.getNextThursday();
                if(nextThursday !== currentOrder.$value) {
                    const weekOrders = this.db.list('/weekOrders');
                    weekOrders.push({date: nextThursday});
                }
            });
        // 1. check if is the next thursday
        // if it is not,
        // a. create new order in orders
        // b. update config.currentOrder with the $key of new order
    }

    getNextThursday() {
        const date = new Date();
        const day = date.getDay() || 7;
        date.setHours( 24 * (7 - day + 4) );
        return new Date( date.getFullYear(), date.getMonth(), date.getDate() );
    }

}
