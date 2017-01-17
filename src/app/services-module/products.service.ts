import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {ICategory} from '../models/category';
import {IProduct} from '../models/product';
import {OrderUtils} from '../../utils/utils';

@Injectable()
export class ProductsService {
    categories: ICategory[];

    constructor(private db: AngularFireDatabase) {}

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
                active: false
            } )
            .map( product =>
                OrderUtils.reformatImgUrl( product, imageDir ) );

}
