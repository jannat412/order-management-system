import {Component, OnInit, OnDestroy} from '@angular/core';
import {ConfigService} from '../services/config.service';
import {Subscription} from 'rxjs/Subscription';
import {AdminTypeService} from '../services/admin-type.service';

@Component( {
    selector: 'oms-admin',
    templateUrl: './admin.component.html'
} )
export class AdminComponent implements OnInit, OnDestroy {

    configActiveSubscription: Subscription;
    configCurrentOrderSubscription: Subscription;
    isActive: boolean = false;
    activeLabel: string = '';
    buttonLabel: string = '';
    errorMessage: any;
    currentOrderDate: string;

    constructor(
        private configService: ConfigService,
        private adminTypeService: AdminTypeService
    ) {}

    adminType = (type: string) => {
        return this.adminTypeService.getAdminType(type);
    };

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
