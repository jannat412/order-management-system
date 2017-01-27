import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {IProduct} from '../models/item';
import {OrderUtils} from '../utils/utils';

@Injectable()
export class ProductsService {

    constructor(private db: AngularFireDatabase) {
    }

    /**
     * get list of products ordered by categories
     * @returns {FirebaseListObservable<any[]>}
     */
    getProducts = (): Observable<IProduct[]> => {
        return this.db.list( 'products', {
            query: {orderByChild: 'categoryKey'}
        } )
            .map( products => {
                return products
                    .map( product =>
                        OrderUtils.reformatImgUrl( product, 'thumbs' )
                    );
            } );
    };

    /**
     * get a product item
     * @param key
     * @param imageDir
     */
    getProduct = (key: string, imageDir: string = 'images'): Observable<IProduct> =>
        this.db.object( `/products/${key}` )
            .startWith( {
                $key: '',
                name: '',
                active: false,
                imgName: 'temp-image.jpg'
            } )
            .map( product =>
                OrderUtils.reformatImgUrl( product, imageDir ) );

}
