    import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';
import 'rxjs/Rx';

@Injectable()
export class ProductsService {

    constructor(private af: AngularFire) {}

    getTags() {
        return this.af.database.list('/tags');
    }

    getCategories() {
        return this.af.database.list( '/categories' );
    }

    getProducts() {
        return this.af.database.list( '/productes', {
            query: {
                orderByChild: 'category'
            }
        } );
    }

    getProduct(id: number) {
        return this.af.database.object( '/productes/' + id );
    }

}
