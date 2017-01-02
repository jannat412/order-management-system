import {Injectable} from '@angular/core';

@Injectable()
export class AdminTypeService {

    types = {
        mainOrder: {
            name: 'comanda general',
            icon: 'glyphicon-grain',
            route: 'comanda-general'
        },
        orders: {
            name: 'comandes de les sòcies',
            icon: 'glyphicon-shopping-cart',
            route: 'comandes'
        },
        products: {
            name: 'productes i categories',
            icon: 'glyphicon-apple',
            route: '/admin'
        },
        users: {
            name: 'gestió de les sòcies',
            icon: 'glyphicon-user',
            route: '/admin'
        }
    };

    getAdminType = (type: string) => {
        return this.types[type];
    };

}