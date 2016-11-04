import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';

@Injectable()
export class ProductsService {

    constructor(private db: AngularFireDatabase) {}

    getProducts() {
        return this.db.list( '/products', {
            query: {
                orderByChild: 'name'
            }
        } );
    }

    getProduct(id: number) {
        let segment = `/products/${id}`;
        return this.db.object( segment );
    }

}
