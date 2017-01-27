import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ConfigService} from './config.service';
import {database} from 'firebase';
import {AngularFireDatabase} from 'angularfire2';
import {IOrder} from '../models/order';
import {IProduct, IOrderLine} from '../models/item';
import {OrderUtils} from '../utils/utils';

@Injectable()
export class AdminOrderService {

    private getCurrentOrdersKeys = this.configService.getCurrentOrderKey()
        .switchMap( currentOrder => this.db.list( `weekOrder/${currentOrder}/orders` ) );

    // orders by user
    private getOrders = this.getCurrentOrdersKeys
        .map( orders => orders
            .map( order => this.db.object( `orders/${order.$key}` ) )
        );

    // orders global by product
    private getOrdersProducts = this.getCurrentOrdersKeys
        .map( orders => orders
            .map( order => this.db.list( `orders/${order.$key}/order` ) )
        );

    constructor(private db: AngularFireDatabase,
                private configService: ConfigService) {
    }

    getCurrentOrdersGlobal = () => {
        return this.getOrdersProducts
            .switchMap( (data) => Observable.combineLatest( data ) );
    };

    getCurrentOrdersByUser = () => {
        return this.getOrders
            .mergeMap( (data) => Observable.combineLatest( data ) );
    };

    getOrder = (orderKey: string): Observable<IOrder> => {
        return this.db.object( `orders/${orderKey}` )
            .startWith( {
                order: {},
                deliverInfo: {},
                user: '',
                weekOrderKey: '',
                checked: false
            } );
    };

    updateOrder = (orderKey: string, productKey: string, line: IOrderLine) => {
        this.db.object( `/orders/${orderKey}/order/${productKey}` )
            .update( line )
            .then( () => console.log( 'update order done' ) )
            .catch( err => console.log( err, 'Error on update order' ) );
    };

    setOrderStatus = (orderKey: string, status: boolean) => {
        this.db.object( `/orders/${orderKey}` )
            .update( {checked: status} );
    };

    getFilteredProducts = (orderKey: string, str: string, detachList: string[]): Observable<IProduct[]> => {
        if (str.trim().length) {
            return this.db.list( 'products', {
                query: {
                    orderByChild: 'active',
                    equalTo: true
                }
            } )
                .map( products => products
                    .filter( (product) => {
                        return (product[ 'name' ].match( new RegExp( str, 'g' ) )) &&
                            detachList.indexOf( product.$key ) === -1;
                    } )
                    .map( product =>
                        OrderUtils.reformatImgUrl( product, 'thumbs' ) )
                );

        } else {
            return Observable.from( [] );
        }

    };

    addProductToOrder = (product: IProduct, orderKey: string) => {
        const PRODUCT_LINE = {
            name: product.name,
            price: product.price,
            unity: product.unity,
            quantity: 0,
            total: 0,
            oldQuantity: 0,
            oldTotal: 0
        };
        database().ref( `/orders/${orderKey}/order` )
            .child( product.$key )
            .set( PRODUCT_LINE );
    };
}
