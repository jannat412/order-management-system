import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Injectable()
export class ProductsService {

    constructor(private af: AngularFire) {}

    getProducts() {
        return this.af.database.list( '/products', {
            query: {
                orderByChild: 'category'
            }
        } );
    }

    getProduct(id: number) {
        let segment = `/products/${id}`;
        return this.af.database.object( segment );
    }

}
