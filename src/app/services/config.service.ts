import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConfigService {

    constructor(private db: AngularFireDatabase) {
    }

    /**
     * Is app Active
     * @returns {Observable<R>}
     */
    getActive = (): Observable<any> => {
        return this.db.object( 'config/active' )
            .map( active => active.$value );
    };

    /**
     * toggle on / off app
     * @param val
     * @param date
     */
    setActive = (val: boolean, date: string) => {
        const activeNode = this.db.object( '/config' );
        activeNode.update( {active: val} );
        if (val) this.createCurrentOrder( date );
    };

    /**
     * get the key for the current order active
     * @returns {FirebaseObjectObservable<any>}
     */
    private getCurrentOrderKey = (): Observable<any> => {
        return this.db.object( 'config/currentOrder' )
            .map( orderKey => orderKey.$value );
    };

    /**
     * get the limit date for the current order
     * @returns {Observable<R>}
     */
    getCurrentOrderDate = (): Observable<any> => {
        return this.getCurrentOrderKey()
            .map( currentOrder => {
                return this.db.object( `weekOrder/${currentOrder}` );
            } )
            .flatMap( val => val );
    };

    /**
     * creates a new order entry and updates config.currentOrder accordling
     * @param date
     */
    private createCurrentOrder = (date: string) => {
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

    };

    /**
     * private
     * static
     * calculates the date for the next thursday (limit date to order)
     * @returns {string}
     */
    private static getNextThursday = () => {
        const date = new Date();
        const day = date.getDay() || 7;
        date.setHours( 24 * (7 - day + 4) );
        return new Date( date.getFullYear(), date.getMonth(), date.getDate() ).toString();
    };

}
