import {AuthProviders, AuthMethods} from 'angularfire2';
export const FirebaseConfig = {
    apiKey: 'AIzaSyAPtqItl2UtYscGTCBnnNUK9gdWOikXU1c',
    authDomain: 'llevat-b0d66.firebaseapp.com',
    databaseURL: 'https://llevat-b0d66.firebaseio.com',
    storageBucket: '',
    messagingSenderId: '100976955250'
};

export const FirebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};
