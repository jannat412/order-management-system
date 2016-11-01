import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Injectable()
export class CategoriesService {

    constructor(private af: AngularFire) {}

    getCategories() {
        return this.af.database.list( '/categories' );
    }

}
