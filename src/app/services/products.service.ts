import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import 'rxjs/Rx';

@Injectable()
export class ProductsService {
    tags: FirebaseListObservable<any[]>;
    categories: FirebaseListObservable<any[]>;
    items: FirebaseListObservable<any[]>;

    constructor(private af: AngularFire) {
        this.tags = af.database.list('/tags');
        this.categories = af.database.list('/categories');
        this.items = af.database.list('/productes', {
            query: {
                orderByChild: 'category'
            }
        });
    }

    getTags() {
        return this.tags;
    }

    getCategories() {
        return this.categories;
    }

    getProducts() {
        return this.items;
    }

}
