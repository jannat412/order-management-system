import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {ICategory} from '../models/category';

@Injectable()
export class CategoriesService {

    constructor(private db: AngularFireDatabase) {
    }

    /**
     * Products Categories Observable
     * @returns {FirebaseListObservable<any[]>}
     */
    getCategories = (): Observable<ICategory[]> => {
        return this.db.list( 'categories', {
            query: {
                orderByKey: true
            }
        } );
    };

    /**
     * Category for product
     * @param id
     * @returns {FirebaseObjectObservable<any>}
     */
    getCategoryForProduct =
        (id: string): Observable<ICategory> => this.db.object( `/categories/${id}` )
            .startWith( {
                $key: '',
                className: ''
            } );

}
