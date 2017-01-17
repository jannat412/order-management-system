import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConfigService} from '../../../services-module/config.service';
import {Subscription} from 'rxjs/Subscription';

@Component( {
    selector: 'oms-admin-active-app',
    templateUrl: './admin-active-app.component.html'
} )
export class AdminActiveAppComponent implements OnInit, OnDestroy {

    configActiveSubscription: Subscription;
    configCurrentOrderSubscription: Subscription;
    isActive: boolean = false;
    activeLabel: string = '';
    buttonLabel: string = '';
    errorMessage: any;
    currentOrderDate: string;

    constructor(
        private configService: ConfigService) {}

    updateLabels = () => {
        this.buttonLabel = this.isActive ? 'Desactivar' : 'Activar';
        this.activeLabel =
            'Comanda ' + (this.isActive ? 'activada' : 'desactivada');
    };

    toggleActivation = () => {
        this.isActive = !this.isActive;
        this.configService.setActive( this.isActive, this.currentOrderDate );
    };

    ngOnInit() {
        this.configActiveSubscription =
            this.configService.getActive()
                .subscribe(
                    (data) => {
                        this.isActive = data;
                        this.updateLabels();
                    },
                    (error) => {
                        console.log( error );
                        this.errorMessage = <any>error
                    }
                );

        this.configCurrentOrderSubscription =
            this.configService.getCurrentOrderDate()
                .subscribe(
                    (data) => {
                        this.currentOrderDate = data.limitDate;
                    }
                )
    }

    ngOnDestroy() {
        this.configActiveSubscription.unsubscribe();
        this.configCurrentOrderSubscription.unsubscribe();
    }

}
