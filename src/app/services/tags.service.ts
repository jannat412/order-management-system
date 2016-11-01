import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';

@Injectable()
export class TagsService {

    constructor(private af: AngularFire) {}

    getTags() {
        return this.af.database.list( '/tags' );
    }

}
