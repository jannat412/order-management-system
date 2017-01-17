import {Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {IUser} from '../models/user';

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
    private getUserRole = (): Observable<any> => {
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

    getUserData = (uid: string): Observable<IUser> => {
        return this.db.object( `/users/${uid}` );
    };

    getUsersData = (): Observable<IUser[]> => {
        return this.db.list( '/users' );
    };

}
