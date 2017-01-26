import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {database} from 'firebase';
import {AngularFireDatabase} from 'angularfire2';

import {AuthService} from './auth.service';
import {ConfigService} from './config.service';

import {IOrder} from '../models/order';
import {IOrderLine} from '../models/orderLine';

import {OrderUtils, ObjectUtils} from '../utils/utils';

@Injectable()
export class OrderService {

    private uid: string = null;
    private totalAmount: number = 0;
    private currentOrderKey: string;
    private userOrderKey: string;
    private order = <IOrderLine>{};
    private deliverInfo: any;
    pushTotalAmount = new EventEmitter<number>();
    emittedOrder = new EventEmitter<any>();
    lineDataEmitter = new EventEmitter<boolean>();
    saveOrderEmitter = new EventEmitter<any>();

    constructor(private db: AngularFireDatabase,
                private configService: ConfigService,
                private authService: AuthService) {
    }

    /**
     * check if order exists for user and current Order week, and if so, return the key of the order
     * @returns {Observable<any>}
     */
    private checkIfOrderExists = (): Observable<string> => {
        return this.configService.getCurrentOrderDate()
            .flatMap( (currentOrderKey) => {
                this.currentOrderKey = currentOrderKey.$key;
                return this.authService.getUserId()
                    .flatMap( uid => {
                        this.uid = uid;
                        return this.db.object( `/ordersPerUser/${uid}/${currentOrderKey.$key}` )
                    } );
            } )
            .map( (order) => order.$value );
    };

    private checkTempOrder = (data) => {
        data.forEach( (item) => {
            this.checkTempProductOrder( item );
        } );
    };

    private checkTempProductOrder = (item) => {
        if (!this.order[ item.$key ] && item.$value !== null) {
            this.order[ item.$key ] = {
                name: item.name,
                price: item.price,
                unity: item.unity,
                quantity: item.quantity,
                total: item.total
            };
        }
    };

    /**
     * get product lines for current user and order
     * @returns {Observable<R>}
     */
    getOrderLinesByUser = (): Observable<any> => {
        return this.checkIfOrderExists()
            .flatMap( (userOrderKey) => {
                this.userOrderKey = userOrderKey;
                return this.db.object( `/orders/${userOrderKey}` );
            } )
            .map( (data) => {
                this.deliverInfo = data.deliverInfo || {
                        deliverType: '',
                        comment: '',
                        center: '',
                        address: ''
                    };
                this.checkTempOrder( OrderUtils.orderListToArray( data.order ) );
                this.onChangeOrderEmit();
                data.order = OrderUtils.orderListToArray( this.order );
                return data;
            } );
    };

    /**
     * get single current product line for current user and order
     * @param productKey
     * @returns {Observable<any>}
     */
    getProductOrderLine = (productKey: string): Observable<IOrderLine> => {
        return this.checkIfOrderExists()
            .flatMap( (userOrderKey) => {
                return this.db.object( `/orders/${userOrderKey}/order/${productKey}` )
            } )
            .map( data => {
                this.checkTempProductOrder( data );
                if (!this.order[ data.$key ]) {
                    return {
                        quantity: 0,
                        total: 0
                    }
                }
                this.onChangeOrderEmit();
                return this.order[ data.$key ];
            } );
    };

    /**
     * calculates total amount and emits the new order list and total amount
     */
    private calculateTotalAmount = (): void => {
        this.totalAmount = Math.round( Object.keys( this.order ).reduce( (sum, key) => {
                    return sum + (this.order[ key ].total || 0);
                }, 0 ) * 1e2 ) / 1e2;
    };

    /**
     * add a product detail to order
     * then recalculates total amount
     * @param productLine
     */
    addProductLine = (productLine) => {
        this.order[ productLine.$key ] = {
            name: productLine.name,
            price: productLine.price,
            unity: productLine.unity,
            quantity: productLine.quantity,
            total: productLine.total,
            oldQuantity: productLine.quantity,
            oldTotal: productLine.total
        };
        this.onChangeOrderEmit();
    };

    /**
     * register changes from outside with emitter
     */
    onChangeOrderEmit = () => {
        this.calculateTotalAmount();
        this.emittedOrder.emit( OrderUtils.orderListToArray( this.order ) );
        this.pushTotalAmount.emit( this.totalAmount );
    };

    // getProductsOrderLines = () => {
    //     return this.db.object( `/orders/${this.userOrderKey}/order` );
    // };

    /**
     * returns a given product item detail from order
     * @param key
     */
    //getLineData = (key: string): any => this.order[key] || null;

    /************ SAVE TO FIREBASE ************/

    getDeliverInfo = (): string => this.deliverInfo || {};

    getUser = (): string => this.uid;

    /**
     * check if order exists and creates or updates it
     */
    saveOrder = (deliverInfo: any) => {
        this.userOrderKey ? this.updateOrder( deliverInfo ) : this.createNewOrder( deliverInfo );
    };

    /**
     * pushes a new order
     */
    private createNewOrder = (deliverInfo: any) => {
        const FILTERED_ORDER = ObjectUtils.filterObjectArray( this.order, line => line.quantity > 0 );
        const ORDER: IOrder = {
            weekOrderKey: this.currentOrderKey,
            order: FILTERED_ORDER,
            deliverInfo: deliverInfo || {},
            user: this.uid,
            timestamp: database[ 'ServerValue' ][ 'TIMESTAMP' ],
            checked: false
        };
        this.db.list( '/orders' )
            .push( ORDER )
            .then( keyData => {
                this.saveOrderPerUser( keyData );
                this.saveOrderPerWeekOrder( keyData );
                this.saveOrderEmitter.emit( {status: true, message: 'create'} );
            } );
    };

    /**
     * updates the orders/{orderKey} node
     */
    private updateOrder = (deliverInfo: any) => {
        const FILTERED_ORDER = ObjectUtils.filterObjectArray( this.order, line => line.quantity > 0 );
        this.db.object( `/orders/${this.userOrderKey}` )
            .update( {
                order: FILTERED_ORDER,
                deliverInfo: deliverInfo || {},
                timestamp: database[ 'ServerValue' ][ 'TIMESTAMP' ]
            } )
            .then( () => {
                this.saveOrderEmitter.emit( {status: true, message: 'update'} );
            } );
    };

    /**
     * creates a new row on ordersPerUser table based on user key and order key
     * @param keyData
     */
    private saveOrderPerUser = (keyData) => {
        database().ref( `/ordersPerUser/${this.uid}` )
            .child( this.currentOrderKey )
            .set( keyData.key );
    };

    /**
     * creates a new row on weekOrder orders table based on current order key and order key
     * @param keyData
     */
    private saveOrderPerWeekOrder = (keyData) => {
        database().ref( `/weekOrder/${this.currentOrderKey}/orders` )
            .child( keyData.key )
            .set( true );
    };

}
