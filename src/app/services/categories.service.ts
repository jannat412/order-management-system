import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs';

@Injectable()
export class CategoriesService {

    constructor(private db: AngularFireDatabase) {
    }

    getCategories(): Observable<any> {
        return this.db.list( 'categories', {
            query: {
                orderByChild: 'name'
            }
        } );
    }

}
