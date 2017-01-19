import {Injectable} from '@angular/core';
import {AngularFire, FirebaseAuthState, AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {IAuth} from '../models/auth';
import {auth} from 'firebase';

@Injectable()
export class AuthService {
    constructor(private af: AngularFire,
                private db: AngularFireDatabase) {
    }

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

    createTempUser = (data) => {
        data.active = false;
        data.role = 'soci';
        return this.db.list( `/tempUsers` ).push( data );
    };

    verifyRegistration = () => {
        auth().currentUser.sendEmailVerification()
            .then(
                function (e) {
                    console.log( 'email sent', e );
                }, function (err) {
                    console.error( err );
                }
            );
    };

    createUser = (data) => {
        console.log( data );
        return this.db.list( 'tempUsers' )
            .map( users => users
                .filter( (user) => (user.email === data.email) && !user.active )
            )
            .map( (user) => {
                if (user.length) {
                    this.af.auth.createUser( {
                        email: data.email,
                        password: data.password
                    } );
                }
                return user;
            } );
        // check if exists in temp users by email
        // check if it is active = false
        // if not error message with help contact
        // else create user and prevent login
        // delete temp user
        // send verify email
        // return this.af.auth.createUser( {
        //     email: data.email,
        //     password: data.password
        // } );

    };

    saveUserInfo = (uid, data) => {
        return this.db.object( `users/${uid}` ).set( data );
    };

    updateUser = () => {

    }
}
