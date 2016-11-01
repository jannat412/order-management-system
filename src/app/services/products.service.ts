import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Injectable()
export class ProductsService {

    constructor(private af: AngularFire) {}

    getProducts() {
        return this.af.database.list( '/productes', {
            query: {
                orderByChild: 'category'
            }
        } );
    }

    getProduct(id: number) {
        let segment = `/productes/${id}`;
        return this.af.database.object( segment );
    }

}
