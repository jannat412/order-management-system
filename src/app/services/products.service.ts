import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import 'rxjs/Rx';
import {IProduct} from '../products/product';

@Injectable()
export class ProductsService {
    private tags: FirebaseListObservable<any[]>;
    private categories: FirebaseListObservable<any[]>;
    private items: FirebaseListObservable<any[]>;
    private item: FirebaseObjectObservable<any>;

    constructor(private af: AngularFire) {
    }

    getTags() {
        this.tags = this.af.database.list('/tags');
        return this.tags;
    }

    getCategories() {
        this.categories = this.af.database.list('/categories');
        return this.categories;
    }

    getProducts() {
        this.items = this.af.database.list('/productes', {
            query: {
                orderByChild: 'category'
            }
        });
        return this.items;
    }

    getProduct(id: number) {
        this.item = this.af.database.object('/productes/' + id);
        return this.item;
    }

}
