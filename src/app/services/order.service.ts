import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {database} from 'firebase';
import {AngularFireDatabase} from 'angularfire2';

import {AuthService} from './auth.service';
import {ConfigService} from './config.service';

import {IOrder} from '../models/order';
import {IOrderLine} from '../models/orderLine';

import {ArrayUtils} from '../../utils/array.utils';

@Injectable()
export class OrderService {

    private uid: string = null;
    private totalAmount: number = 0;
    private currentOrderKey: string;
    private userOrderKey: string;
    private order = <IOrderLine>{};
    private comment: string = '';
    pushTotalAmount = new EventEmitter<number>();
    emittedOrder = new EventEmitter<any>();
    lineDataEmitter = new EventEmitter<boolean>();
    saveOrderEmitter = new EventEmitter<any>();

    constructor(private db: AngularFireDatabase,
                private configService: ConfigService,
                private authService: AuthService) {

        this.authService.getUserId()
            .subscribe(
                (uid) => {
                    console.log( 'uid: ', uid );
                    this.uid = uid
                }
            ).unsubscribe();

        this.configService.getCurrentOrderDate()
            .subscribe(
                (data) => {
                    this.currentOrderKey = data.$key;
                    this.checkIfOrderExists().subscribe(
                        (userOrder) => {
                            this.order = <IOrderLine>{};
                            if (userOrder) {
                                this.userOrderKey = userOrder;

                                // order items
                                this.db.object( `/orders/${this.userOrderKey}` )
                                    .subscribe(
                                        (data) => {
                                            this.comment = data.comment;
                                            this.order = data.order;
                                            this.calculateTotalAmount();
                                            this.getInitOrder();
                                            this.lineDataEmitter.emit( true );
                                        }
                                    );

                            }
                        }
                    );
                } );
    }

    /**
     * return order
     */
    getOrder = (): any => this.order;

    getInitOrder = () => {
        this.emittedOrder.emit( ArrayUtils.orderListToArray( this.order ) );
        this.pushTotalAmount.emit( this.getTotalAmount() );
    };

    getProductsOrderLines = () => {
        return this.db.object( `/orders/${this.userOrderKey}/order` );
    };

    /**
     * add a product detail to order
     * then recalculates total amount
     * @param productLine
     */
    addProductLine = (productLine) => {
        if (productLine.quantity <= 0) {
            delete this.order[productLine.$key];
        } else {
            this.order[productLine.$key] = {
                name: productLine.name,
                price: productLine.price,
                unity: productLine.unity,
                quantity: productLine.quantity,
                total: productLine.total
            };
        }
        this.calculateTotalAmount();
        this.getInitOrder();
    };

    /**
     * returns a given product item detail from order
     * @param key
     */
    getLineData = (key: string): any => this.order[key] || null;

    /**
     * returns total amount
     */
    getTotalAmount = (): number => this.totalAmount;

    /**
     * calculates total amount and emits the new order list and total amount
     */
    private calculateTotalAmount = (): void => {
        this.totalAmount = Math.round( Object.keys( this.order ).reduce( (sum, key) => {
                    return sum + this.order[key].total;
                }, 0 ) * 1e2 ) / 1e2;
    };


    /************ SAVE TO FIREBASE ************/

    saveComment = (comment: string) => {
        this.comment = comment;
    };

    getComment = (): string => this.comment;

    /**
     * check if order exists and creates or updates it
     */
    saveOrder = () => {
        this.userOrderKey ? this.updateOrder() : this.createNewOrder();
    };

    /**
     * check if order exists for user and current Order week, and if so, return the key of the order
     * @returns {Observable<any>}
     */
    checkIfOrderExists = (): Observable<string> => {
        return this.configService.getCurrentOrderDate()
            .flatMap( (currentOrderKey) => {
                console.log( 'user', this.uid );
                return this.authService.getUserId()
                    .flatMap( uid => {
                        console.log( 'uid::: ', uid );
                        return this.db.object( `/ordersPerUser/${uid}/${currentOrderKey.$key}` )
                    } );
            } )
            .map( (order) => order.$value );
    };

    getOrderLinesByUser = (): Observable<any> => {
        return this.checkIfOrderExists()
            .flatMap( (userOrderKey) => {
                console.log( userOrderKey );
                if (userOrderKey) {
                    return this.db.list( `/orders/${userOrderKey}/order` )
                } else {
                    return null;
                }
            } )
    };

    getOrderLineByKey = (productKey: string): Observable<any> => {
        return this.checkIfOrderExists()
            .flatMap( (userOrderKey) => {
                return this.db.object( `/orders/${userOrderKey}/order/${productKey}` )
            } )
            .map( data => {
                if (data.$value === null) {
                    return {
                        quantity: 0,
                        total: 0,
                        name: ''
                    }
                }
                return data;
            } );
    };

    /**
     * pushes a new order
     */
    private createNewOrder = () => {
        const orders = this.db.list( '/orders' );
        const order: IOrder = {
            weekOrderKey: this.currentOrderKey,
            order: this.getOrder(),
            user: this.uid,
            comment: this.comment,
            timestamp: database['ServerValue']['TIMESTAMP'],
            checked: false
        };
        orders.push( order )
            .then( keyData => {
                this.saveOrderPerUser( keyData );
                this.saveOrderPerWeekOrder( keyData );
                this.saveOrderEmitter.emit( {status: true, message: 'create'} );
            } );
    };

    /**
     * updates the orders/{orderKey} node
     */
    private updateOrder = () => {
        const order = this.db.object( `/orders/${this.userOrderKey}` );
        order.update( {
            order: this.getOrder(),
            comment: this.comment,
            timestamp: database['ServerValue']['TIMESTAMP']
        } )
            .then( () => {
                this.saveOrderEmitter.emit( {status: true, message: 'update'} );
            } );
    };

    /**
     * creates a new row on ordersPerUser table based on user key and order key
     * @param keyData
     * @param uid
     */
    private saveOrderPerUser = (keyData) => {
        const ordersPerUser = database().ref( `/ordersPerUser/${this.uid}` );
        const ordersPerUserAssociation = ordersPerUser.child( this.currentOrderKey );
        ordersPerUserAssociation.set( keyData.key );
    };

    /**
     * creates a new row on weekOrder orders table based on current order key and order key
     * @param keyData
     */
    private saveOrderPerWeekOrder = (keyData) => {
        const orderPerWeekOrders = database().ref( `/weekOrder/${this.currentOrderKey}/orders` );
        const ordersPerWeekAssociation = orderPerWeekOrders.child( keyData.key );
        ordersPerWeekAssociation.set( true );
    };

}
