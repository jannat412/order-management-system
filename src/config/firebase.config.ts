import {AuthProviders, AuthMethods} from 'angularfire2';
export const FIREBASE_CONFIG = {
    apiKey: 'AIzaSyAPtqItl2UtYscGTCBnnNUK9gdWOikXU1c',
    authDomain: 'llevat-b0d66.firebaseapp.com',
    databaseURL: 'https://llevat-b0d66.firebaseio.com',
    storageBucket: '',
    messagingSenderId: '100976955250'
};

export const FIREBASE_AUTH_CONFIG = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};
