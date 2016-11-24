import {Injectable} from '@angular/core';
import {IUser} from '../models/user';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {Observable, Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {

    constructor(private af: AngularFire,
                private router: Router) {
    }

    /**
     * login
     * @param user
     * @returns {Observable<any>}
     */
    loginUser = (user: IUser): Observable<FirebaseAuthState> => {
        return this.fromAuthPromise( this.af.auth.login( {
            email: user.email,
            password: user.password
        } ) );
    };

    /**
     * observe authentication user state
     * private
     * @param promise
     * @returns {Observable<any>}
     */
    private fromAuthPromise = (promise): Observable<any> => {
        const subject = new Subject<any>();
        promise
            .then( res => {
                    subject.next( res );
                    subject.complete();
                },
                err => {
                    subject.error( err );
                    subject.complete();
                } );
        return subject.asObservable();
    };

    /**
     * logout user
     */
    logoutUser = () => this.af.auth.logout();

    /**
     * check auth state
     * @returns {Observable<R>}
     */
    isUserLogged = (): Observable<boolean> => {
        return this.af.auth.map( (auth) => {
            return !auth ? false : true;
        } );
    };

    /**
     * get user uid
     * @returns {Observable<R>}
     */
    getUserId = (): Observable<string> => {
        return this.af.auth
            .map( auth => {
                return (auth && auth.uid) ? auth.uid : '';
            } );
    };
}
