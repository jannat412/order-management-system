import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

    private ls;

    constructor() {
        this.ls = window.localStorage;
    }

    /**
     * check if key exists in local storage
     * @param key
     */
    existsKey = (key: string) => this.ls[key] !== 'undefined';

    /**
     * get local storage value given a key
     * @param key
     * @returns {any|boolean}
     */
    getValue = (key: string): any => {
        let returnValue;

        if (this.existsKey( key )) {
            const value = this.ls[key];

            try { // if it's an object like string
                returnValue = JSON.parse( value );
            } catch (e) {
                if (e.constructor.name === 'SyntaxError') { // if it's a string
                    returnValue = value;
                }
            }
        }

        return returnValue || false;
    };

    /**
     * save key/value to local storage
     * @param key
     * @param value
     */
    saveValue = (key: string, value: any) => {
        if (typeof value === 'object') {
            this.ls[key] = JSON.stringify( value );
        } else {
            this.ls[key] = value;
        }
    };

    /**
     * remove key/value form local storage
     * @type {(key:string)=>void}
     */
    clearValue = (key) => this.ls.removeItem( key );

}
