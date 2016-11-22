import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

    private ls;

    constructor() {
        this.ls = window.localStorage;
    }

    existsKey = (key: string) => this.ls[key] !== 'undefined';

    getValue = (key: string): any => {
        let returnValue;

        if (this.existsKey( key )) {
            const value = this.ls[key];

            try {
                returnValue = JSON.parse( value );
            } catch (e) {
                if (e.constructor.name === 'SyntaxError') {
                    returnValue = value;
                }
            }
        }

        return returnValue;
    };

    saveValue = (key: string, value: any) => {
        if (typeof value === 'object') {
            this.ls[key] = JSON.stringify(value);
        } else {
            this.ls[key] = value;
        }
    };

}
