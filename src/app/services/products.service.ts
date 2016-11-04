import {Injectable} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2';
import {Observable} from 'rxjs';
import {CategoriesService} from './categories.service';
import {ICategory} from '../models/category';
import {IProduct} from '../models/product';

@Injectable()
export class ProductsService {
    categories: ICategory[];

    constructor(private db: AngularFireDatabase,
                private categoriesService: CategoriesService) {
    }

    private getCategories() {
        return this.db.list( 'categories', {
            query: {
                orderByChild: 'name'
            }
        } );
    }


    getProductsByCategory(): Observable<any[]> {
        const categories = this.getCategories()
            .do( console.log );

        const productsPerCategory = categories
        //.switchMap( product => this.db.list( 'productsPerCategory/' + product.$key ) )
        //.switchMap( category => this.db.list( 'productsPerCategory/' + category.$key ) )
            .map( lspc => lspc.map( lpc => lpc.$key ) )
            .map( prod => prod.map( pr => this.db.list( 'productsPerCategory/' + pr ) ) )
            .flatMap( fbojs => Observable.combineLatest( fbojs ) )
            //.map(prods => prods.map(pr => this.db.list('products/' + pr.$key)))
            .do( console.log );

        const products = productsPerCategory
            .map( products => products.map( prods => prods.map(pro => this.db.object( 'products/' + pro.$key ) ) ))
            .flatMap( fbojs => Observable.combineLatest( fbojs ) )
            .do( console.log );

        return products;

    }


    getProduct(id: number) {
        let segment = `/products/${id}`;
        return this.db.object( segment );
    }

}
