import {Injectable} from '@angular/core';

@Injectable()
export class AdminTypeService {

    types = {
        orders: {
            name: 'comandes',
            icon: 'glyphicon-shopping-cart',
            route: ''
        },
        products: {
            name: 'productes i categories',
            icon: 'glyphicon-apple',
            route: ''
        },
        users: {
            name: 'socis',
            icon: 'glyphicon-user',
            route: ''
        }
    };

    getAdminType = (type: string) => {
        return this.types[type];
    };

}