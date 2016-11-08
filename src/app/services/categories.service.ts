import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs';
import {ICategory} from '../models/category';

@Injectable()
export class CategoriesService {

    constructor(private db: AngularFireDatabase) {}

    getCategories(): Observable<ICategory[]> {
        return this.db.list( 'categories', {
            query: {
                orderByKey: true
            }
        } );
    }

}
