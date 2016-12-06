import {Injectable, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {database} from 'firebase';
import {AngularFireDatabase} from 'angularfire2';
import {AuthService} from './auth.service';
import {Subscription} from 'rxjs/Subscription';
import {OrderLocalStorageService} from './order-local-storage.service';


@Injectable()
export class OrderService {

    private totalAmount: number = 0;
    private currentOrderKey: string;
    private order = {};
    private comment: string = '';
    pushTotalAmount = new EventEmitter<number>();
    emittedOrder = new EventEmitter<any>();
    lineDataEmitter = new EventEmitter<boolean>();
    saveOrderEmitter = new EventEmitter<any>();
    saveOrderSubscription: Subscription;

    constructor(private db: AngularFireDatabase,
                private orderLocalStorageService: OrderLocalStorageService,
                private authService: AuthService) {
    }

    /**
     * recover order from local storage
     * @param orderKey
     */
    getOrderFromLStorage = (orderKey: string) => {
        this.currentOrderKey = orderKey;
        let ls = this.orderLocalStorageService.getData();
        if (ls && ls.order === this.currentOrderKey && ls.data) {
            this.order = ls.data;
            this.lineDataEmitter.emit( true );
            this.calculateTotalAmount();
        } else {
            this.orderLocalStorageService.clearData();
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
        this.totalAmount = Object.keys( this.order ).reduce( (sum, key) => {
            return sum + this.order[key].total;
        }, 0 );

        this.orderLocalStorageService
            .saveData( this.currentOrderKey, this.getOrder() );

        this.emittedOrder.emit( this.orderListToArray() );
        this.pushTotalAmount.emit( this.getTotalAmount() );
    };


    /************ SAVE TO FIREBASE ************/
    /**
     * init push a new order to orders table
     */
    saveOrder = () => {
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
        this.saveOrderSubscription = this.checkIfOrderExists( uid )
            .subscribe(
                (userOrder) => {
                    userOrder ?
                        this.updateOrder( userOrder ) :
                        this.createNewOrder( uid );
                } );
    };

    /**
     * check if order exists for user and current Order week, and if so, return the key of the order
     * @param uid
     * @param currentOrderKey
     * @returns {Observable<any>}
     */
    private checkIfOrderExists = (uid): Observable<any> => {
        return this.db.object( `/ordersPerUser/${uid}/${this.currentOrderKey}` )
            .map( (order) => order ? order.$value : false );
    };

    /**
     * pushes a new order
     * @param uid
     * @param currentOrderKey
     */
    private createNewOrder = (uid) => {
        const orders = this.db.list( '/orders' );
        orders.push( {
            weekOrderKey: this.currentOrderKey,
            order: this.getOrder(),
            user: uid,
            comment: this.comment
        } )
            .then( keyData => {
                this.saveOrderPerUser( keyData, uid );
                this.saveOrderPerWeekOrder( keyData );
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
    private saveOrderPerUser = (keyData, uid) => {
        const ordersPerUser = database().ref( `/ordersPerUser/${uid}` );
        const ordersPerUserAssociation = ordersPerUser.child( this.currentOrderKey );
        ordersPerUserAssociation.set( keyData.key );
    };

    /**
     * creates a new row on weekOrder orders table based on current order key and order key
     * @param keyData
     * @param currentOrderKey
     */
    private saveOrderPerWeekOrder = (keyData) => {
        const orderPerWeekOrders = database().ref( `/weekOrder/${this.currentOrderKey}/orders` );
        const ordersPerWeekAssociation = orderPerWeekOrders.child( keyData.key );
        ordersPerWeekAssociation.set( true );
    }

}
