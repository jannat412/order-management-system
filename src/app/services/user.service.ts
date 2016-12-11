import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {

    constructor(private db: AngularFireDatabase,
                private authService: AuthService) {
    }

    /**
     * private
     * get user role
     * @returns {Observable<R>}
     */
    private getUserRole = (): Observable<string> => {
        return this.authService.getUserId()
            .switchMap( uid => {
                if (uid) {
                    return this.db.object( `/users/${uid}/role` )
                        .map( role => role.$value );
                }
                return uid;
            } )

    };

    /**
     * check if user is admin
     * @returns {Observable<R>}
     */
    isUserAdmin = (): Observable<boolean> => {
        return this.getUserRole().map( (role) => role === 'admin' );
    };

}
