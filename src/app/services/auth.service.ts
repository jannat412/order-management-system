import {Injectable} from '@angular/core';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {IAuth} from '../models/auth';

@Injectable()
export class AuthService {

    constructor(private af: AngularFire) {}

    /**
     * login
     * @param user
     * @returns {Observable<any>}
     */
    loginUser = (user: IAuth): Observable<FirebaseAuthState> => {
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
     * get user uid
     * @returns {Observable<R>}
     */
    getUserId = (): Observable<any> => {
        return this.af.auth
            .map( auth => {
                return (auth && auth.uid) ? auth.uid : false;
            } );
    };
}
