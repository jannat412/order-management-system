import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {ITag} from '../models/tag';
import {Observable} from 'rxjs';

@Injectable()
export class TagsService {

    constructor(private db: AngularFireDatabase) {}

    /**
     * get tag labels for a product
     * @param productKey
     * @returns {Observable<R>}
     */
    getTagsForProduct = (productKey: string): Observable<ITag[]> => {
        return this.db.list( `tagsPerProduct/${productKey}` )
            .map( tags => tags
                .map( tag => this.db.object( `tags/${tag.$key}` )) )
            .flatMap( (tags) => Observable.combineLatest( tags ) );
    };
}
