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

    setActive(val: boolean, date: string) {
        const activeNode = this.db.object( '/config' );
        activeNode.update( {
            active: val
        } );
        if (val) {
            this.createCurrentOrder( date );
        }
    }

    getCurrentOrderDate(): Observable<any> {
        return this.db.object( 'config/currentOrder' )
            .map( currentOrder => this.db.object( `weekOrder/${currentOrder.$value}` ))
                .switchMap( val => {
                    return val;
                } );
    }

    private createCurrentOrder(date: string) {
        let nextThursday = ConfigService.getNextThursday();
        if (nextThursday !== date) {
            const weekOrder = this.db.list( '/weekOrder' );
            weekOrder.push( {
                limitDate: nextThursday
            } )
                .then( data => {
                    const activeNode = this.db.object( '/config' );
                    activeNode.update( {
                        currentOrder: data.key
                    } );
                } );
        }

    }

    private static getNextThursday() {
        const date = new Date();
        const day = date.getDay() || 7;
        date.setHours( 24 * (7 - day + 4) );
        return new Date( date.getFullYear(), date.getMonth(), date.getDate() ).toString();
    }

}
