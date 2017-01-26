import {Injectable} from '@angular/core';
import {ICenter} from '../models/center';
import {IDeliverMethod} from '../models/deliverMethod';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ResumeDataService {

    deliverMethods: IDeliverMethod[] = [
        {
            value: 'center',
            desc: 'Ja passo jo a recollir-ho'
        },
        {
            value: 'home',
            desc: 'Porteu-m\'ho a casa'
        } ];

    centers: ICenter[] = [
        {
            value: 'nou-barris',
            desc: 'Nou Barris',
            address: 'Local de la cooperativa, C/Miguel Hernández 6, Local 2'
        },
        {
            value: 'gracia',
            desc: 'Gràcia',
            address: 'La Barraqueta, C/Tordera 34, baixos'
        }
    ];

    getDeliverMethods = (): Observable<IDeliverMethod[]> => {
        return Observable.of(this.deliverMethods);
    };

    getCenters = (): Observable<ICenter[]> => {
        return Observable.of(this.centers);
    };

}
