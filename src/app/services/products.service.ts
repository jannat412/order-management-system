import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs';
import {ICategory} from '../models/category';
import {IProduct} from '../models/product';

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
        } );
    };

    /**
     * get a product item
     * @param key
     */
    getProduct = (key: string): Observable<IProduct> =>
        this.db.object( `/products/${key}` );
}
