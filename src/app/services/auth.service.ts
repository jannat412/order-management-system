import {Injectable} from '@angular/core';
import {IUser} from '../models/user';
import {AngularFire, FirebaseAuthState} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

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
    isUserLogged = (): Observable<boolean> => this.af.auth
        .map( (auth) => !!auth );

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
