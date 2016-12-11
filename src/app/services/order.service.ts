import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {database} from 'firebase';
import {AngularFireDatabase} from 'angularfire2';
import {AuthService} from './auth.service';
import {OrderLocalStorageService} from './order-local-storage.service';
import {ConfigService} from './config.service';
import {IOrderLine} from '../models/orderLine';

@Injectable()
export class OrderService {

    private uid: string;
    private totalAmount: number = 0;
    private currentOrderKey: string;
    private userOrderKey: string;
    private order = <IOrderLine>{};
    private comment: string = '';
    pushTotalAmount = new EventEmitter<number>();
    emittedOrder = new EventEmitter<any>();
    lineDataEmitter = new EventEmitter<boolean>();
    saveOrderEmitter = new EventEmitter<any>();
    saveOrderSubscription: Subscription;
    currentOrderDateSubscription: Subscription;
    orderExistsSubscription: Subscription;
    uidSubscription: Subscription;

    constructor(private db: AngularFireDatabase,
                private configService: ConfigService,
                private orderLocalStorageService: OrderLocalStorageService,
                private authService: AuthService) {

        this.uidSubscription = this.authService.getUserId().subscribe(
            (uid) => this.uid = uid
        );


        this.currentOrderDateSubscription = this.configService.getCurrentOrderDate()
            .subscribe(
                (data) => {
                    this.currentOrderKey = data.$key;
                    this.orderExistsSubscription = this.checkIfOrderExists().subscribe(
                        (order) => {
                            if (order) {
                                this.userOrderKey = order;
                                if (!this.userOrderKey) {
                                    let ls = this.orderLocalStorageService.getData();

                                    if (ls && ls.order === this.currentOrderKey && ls.data) {
                                        this.order = ls.data;
                                        this.calculateTotalAmount();
                                        this.getInitOrder();
                                        this.lineDataEmitter.emit( true );
                                    } else {
                                        this.orderLocalStorageService.clearData();
                                    }
                                } else {
                                    console.log( 'order saved' );
                                    const order = this.db.list( `/orders/${this.userOrderKey}/order/` );
                                    order.subscribe(
                                        (data) => {
                                            this.order = <IOrderLine>{};
                                            let self = this;
                                            data.forEach(function(productLine) {
                                                self.addProductLine(productLine);
                                            });
                                            this.calculateTotalAmount();
                                            this.getInitOrder();
                                            this.lineDataEmitter.emit( true );
                                        }
                                    )
                                }
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
        this.emittedOrder.emit( this.orderListToArray() );
        this.pushTotalAmount.emit( this.getTotalAmount() );
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
    private calculateTotalAmount = (): void => {
        this.totalAmount = Math.round( Object.keys( this.order ).reduce( (sum, key) => {
                    return sum + this.order[key].total;
                }, 0 ) * 1e2 ) / 1e2;

        this.orderLocalStorageService
            .saveData( this.currentOrderKey, this.getOrder() );

    };


    /************ SAVE TO FIREBASE ************/

    saveComment = (comment: string) => {
        this.comment = comment;
    };

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
    checkIfOrderExists = (): Observable<any> => {
        return this.db.object( `/ordersPerUser/${this.uid}/${this.currentOrderKey}` )
            .map( (order) => order ? order.$value : false );
    };

    /**
     * pushes a new order
     */
    private createNewOrder = () => {
        const orders = this.db.list( '/orders' );
        orders.push( {
            weekOrderKey: this.currentOrderKey,
            order: this.getOrder(),
            user: this.uid,
            comment: this.comment
        } )
            .then( keyData => {
                this.saveOrderPerUser( keyData );
                this.saveOrderPerWeekOrder( keyData );
                this.saveOrderEmitter.emit( {status: true, message: 'create'} );
                this.saveOrderSubscription.unsubscribe();
            } );
    };

    /**
     * updates the orders/{orderKey} node
     */
    private updateOrder = () => {
        const order = this.db.object( `/orders/${this.userOrderKey}` );
        order.update( {order: this.getOrder(), comment: this.comment} )
            .then( () => {
                this.saveOrderEmitter.emit( {status: true, message: 'update'} );
                this.saveOrderSubscription.unsubscribe();
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
    }

}
