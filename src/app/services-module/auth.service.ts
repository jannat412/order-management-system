import {Injectable} from '@angular/core';
import {initializeApp} from 'firebase';
import {AngularFire, FirebaseAuthState, AngularFireDatabase} from 'angularfire2';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {IAuth} from '../models/auth';
import {auth} from 'firebase';
import {FirebaseConfig} from '../../config/firebase.config';

@Injectable()
export class AuthService {
    secondaryFb = initializeApp( FirebaseConfig, "secondary" );

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

    verifyRegistration = (email) => {
       return this.secondaryFb.auth().sendPasswordResetEmail(email);
    };

    createUser = (userData) => {
        const pass = Math.random().toString( 32 ).slice( -8 );
        console.log(pass);
        return this.secondaryFb.auth().createUserWithEmailAndPassword(
            userData.email, pass
        );
    };

    saveUserInfo = (uid, data) => {
        this.verifyRegistration(data.email)
            .then(
                function (e) {
                    console.log( 'email sent', e );
                }, function (err) {
                    console.error( err );
                }
            );
        this.secondaryFb.auth().signOut();
        return this.db.object( `users/${uid}` ).set( data );
    };

    verifyOnReset = (code: string) => {
        return auth().verifyPasswordResetCode(code);
    };

    confirmPasswordReset = (code: string, newPassword: string) => {
        return auth().confirmPasswordReset(code, newPassword);
    };

    updateUser = () => {

    }
}
