import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Observable} from 'rxjs';
import {CategoriesService} from './categories.service';
import {ICategory} from '../models/category';
import {IProduct} from '../models/product';

@Injectable()
export class ProductsService {
    categories: ICategory[];

    constructor(private db: AngularFireDatabase) {}

    getProducts(): Observable<IProduct[]> {
        return this.db.list( 'products', {
            query: {
                orderByChild: 'categoryKey'
            }
        } );
    }


    getProduct(key: string): Observable<IProduct> {
        let segment = `/products/${key}`;
        return this.db.object( segment );
    }

}
