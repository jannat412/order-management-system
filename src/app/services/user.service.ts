import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {

    constructor(private db: AngularFireDatabase,
                private authService: AuthService) {
    }

    getUserRole = (): Observable<string> => {
        return this.authService.getUserId()
            .switchMap( uid => {
                if(uid) {
                    return this.db.object( `/users/${uid}/role` )
                        .map(role => role.$value);
                }
                return '';
            } )

    }

}
