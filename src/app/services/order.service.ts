import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {database} from 'firebase';
import {AngularFireDatabase} from 'angularfire2';
import {ConfigService} from './config.service';
import {AuthService} from './auth.service';
import {Subscription} from 'rxjs/Subscription';


@Injectable()
export class OrderService {

    private totalAmount: number = 0;
    pushTotalAmount = new EventEmitter<number>();
    order = {};
    comment: string = '';
    emittedOrder = new EventEmitter<any>();
    lineDataEmitter = new EventEmitter<boolean>();
    saveOrderEmitter = new EventEmitter<string>();
    saveOrderSubscription: Subscription;

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
     * init push a new order to orders table
     */
    saveOrder = (comment: string) => {
        this.authService.getUserId().subscribe(
            (uid) => this.getOrderKeyAndSaveOrUpdate( uid )
        );
    };

    saveComment = (comment: string) => {
        this.comment = comment;
    };

    /**
     * check if order exists and creates or updates it
     * @param uid
     */
    private getOrderKeyAndSaveOrUpdate = (uid: string) => {
        this.configService.getCurrentOrderKey().subscribe(
            (currentOrderKey) => {
                this.saveOrderSubscription =
                    this.checkIfOrderExists( uid, currentOrderKey )
                        .subscribe(
                            (userOrder) => {
                                userOrder ?
                                    this.updateOrder( userOrder ) :
                                    this.createNewOrder( uid, currentOrderKey );
                            } );
            } );
    };

    /**
     * check if order exists for user and current Order week, and if so, return the key of the order
     * @param uid
     * @param currentOrderKey
     * @returns {Observable<any>}
     */
    private checkIfOrderExists = (uid, currentOrderKey): Observable<any> => {
        return this.db.object( `/ordersPerUser/${uid}/${currentOrderKey}` )
            .map( (order) => order ? order.$value : false );
    };

    /**
     * pushes a new order
     * @param uid
     * @param currentOrderKey
     */
    private createNewOrder = (uid, currentOrderKey) => {
        const orders = this.db.list( '/orders' );
        orders.push( {
            weekOrderKey: currentOrderKey,
            order: this.getOrder(),
            user: uid,
            comment: this.comment
        } )
            .then( keyData => {
                this.saveOrderPerUser( keyData, currentOrderKey, uid );
                this.saveOrderPerWeekOrder( keyData, currentOrderKey );
                this.saveOrderEmitter.emit( {status: true, message: 'create'} );
                this.saveOrderSubscription.unsubscribe();
            } );
    };

    /**
     * updates the orders/{orderKey} node
     * @param orderKey
     */
    private updateOrder = (orderKey) => {
        const order = this.db.object( `/orders/${orderKey}` );
        order.update( {order: this.getOrder(), comment: this.comment} )
            .then( data => {
                this.saveOrderEmitter.emit( {status: true, message: 'update'} );
                this.saveOrderSubscription.unsubscribe();
            } );
    };

    /**
     * creates a new row on ordersPerUser table based on user key and order key
     * @param keyData
     * @param currentOrderKey
     * @param uid
     */
    private saveOrderPerUser = (keyData, currentOrderKey, uid) => {
        const ordersPerUser = database().ref( `/ordersPerUser/${uid}` );
        const ordersPerUserAssociation = ordersPerUser.child( currentOrderKey );
        ordersPerUserAssociation.set( keyData.key );
    };

    /**
     * creates a new row on weekOrder orders table based on current order key and order key
     * @param keyData
     * @param currentOrderKey
     */
    private saveOrderPerWeekOrder = (keyData, currentOrderKey) => {
        const orderPerWeekOrders = database().ref( `/weekOrder/${currentOrderKey}/orders` );
        const ordersPerWeekAssociation = orderPerWeekOrders.child( keyData.key );
        ordersPerWeekAssociation.set( true );
    }

}
