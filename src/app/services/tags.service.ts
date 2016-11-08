import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {ITag} from '../models/tag';
import {Observable} from 'rxjs';

@Injectable()
export class TagsService {

    constructor(private db: AngularFireDatabase) {
    }

    getTagsForProduct(productKey: string): Observable<ITag[]> {

        return this.db.list( `tagsPerProduct/${productKey}` )
            .map( tags => tags
                .map( tag => {
                    return this.db.object( `tags/${tag.$key}` );
                } ) )
            .flatMap( (tags) => Observable.combineLatest( tags ) );

    }

}
