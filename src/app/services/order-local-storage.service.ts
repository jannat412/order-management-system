import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {IOrderLine} from '../models/orderLine';

@Injectable()
export class OrderLocalStorageService {

    // Local Storage unique key
    private guid: string = '9ca3b2c0-2238-4c7c-931b-bddb0afeaa5d';

    constructor(private localStorageService: LocalStorageService) {}

    /**
     * get local storage value
     */
    getData = () => this.localStorageService.getValue( this.guid );

    /**
     * save local storage value
     * @param orderKey
     * @param data
     */
    saveData = (orderKey: string, data: IOrderLine) => {
        this.localStorageService.saveValue( this.guid, {
            order: orderKey,
            data: data
        } );
    };

    /**
     * remove local storage value
     */
    clearData = () => this.localStorageService.clearValue( this.guid );

}
