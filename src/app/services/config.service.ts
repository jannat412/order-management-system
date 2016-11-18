import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs';

@Injectable()
export class ConfigService {

    constructor(private db: AngularFireDatabase) {
    }

    getActive(): Observable<any> {
        return this.db.object( 'config/active' )
            .map( active => active.$value );;
    }

    setActive(val: boolean) {
        const activeNode = this.db.object( '/config' );
        activeNode.update( {
            active: val
        } );
        // set active
        // check if the order exists
        // if not - create new order with next thusday date
        // update current order in config
    }
}
