import {Injectable, EventEmitter} from '@angular/core';
import {database} from 'firebase';
import {AngularFireDatabase} from 'angularfire2';
import {ConfigService} from './config.service';
import {AuthService} from './auth.service';

@Injectable()
export class OrderService {
    private totalAmount: number = 0;
    pushTotalAmount = new EventEmitter<number>();
    order = {};
    emittedOrder = new EventEmitter<any>();
    lineDataEmitter = new EventEmitter<boolean>();

    constructor(private db: AngularFireDatabase,
                private configService: ConfigService,
                private authService: AuthService) {
    }

    /**
     * recover order from local storage
     * @param obj
     */
    setOrder = (obj) => {
        if (obj) {
            this.order = obj;
            this.lineDataEmitter.emit( true );
            this.calculateTotalAmount();
        }
    };

    /**
     * return order
     */
    getOrder = (): any => this.order;

    /**
     * add a product detail to order
     * then recalculates total amount
     * @param productLine
     */
    addProductLine = (productLine) => {
        if (productLine.quantity <= 0) {
            delete this.order[productLine.productKey];
        } else {
            this.order[productLine.productKey] = {
                name: productLine.name,
                unity: productLine.unity,
                quantity: productLine.quantity,
                total: productLine.total
            };
        }
        this.calculateTotalAmount();
    };

    /**
     * generates the order list as an array
     * @returns {Array}
     */
    orderListToArray = () => {
        let keys = [];
        for (let key in this.order) {
            keys.push( {key: key, value: this.order[key]} );
        }
        keys.sort( (a, b): any => a.value.name > b.value.name );
        return keys;
    };

    /**
     * returns total amount
     */
    getTotalAmount = (): number => this.totalAmount;

    /**
     * calculates total amount and emits the new order list and total amount
     */
    calculateTotalAmount = (): void => {
        this.totalAmount = Object.keys( this.order ).reduce( (sum, key) => {
            return sum + this.order[key].total;
        }, 0 );

        this.emittedOrder.emit( this.orderListToArray() );
        this.pushTotalAmount.emit( this.getTotalAmount() );

    };

    /**
     * returns a given product item detail from order
     * @param key
     */
    getLineData = (key: string): any => this.order[key] || null;

    /**
     * push a new order to orders table
     */
    saveOrder = () => {
        this.authService.getUserId()
            .subscribe(
                (uid) => {
                    this.configService.getCurrentOrderKey()
                        .subscribe(
                            (data) => {
                                const orders = this.db.list( '/orders' );
                                orders.push( {
                                    weekOrderKey: data,
                                    order: this.getOrder(),
                                    user: uid
                                } )
                                    .then( keyData => this.saveOrderPerUser( keyData, uid ) );
                            } );
                } );
    };


    /**
     * creates a new row on  ordersPerUser table based on user key and order key
     * @param keyData
     * @param uid
     */
    private saveOrderPerUser = (keyData, uid) => {
        const ordersPerUser = database().ref( `/ordersPerUser/${uid}` );
        const ordersPerUserAssociation = ordersPerUser.child( keyData.key );
        ordersPerUserAssociation.set( true );
    };

}
