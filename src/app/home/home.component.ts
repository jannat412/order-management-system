import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../services-module/config.service';
import {Subscription} from 'rxjs';

@Component( {
    selector: 'oms-home',
    templateUrl: './home.component.html'
} )
export class HomeComponent implements OnInit {

    private activeSubscription: Subscription;
    private orderDateSubscription: Subscription;
    private isActive: boolean = false;
    private currentOrderDate: string;
    private activeLabel: string;

    constructor(private configService: ConfigService) {}

    updateLabels = () => {
        this.activeLabel =
            this.isActive ?
                'Ja pots fer la teva comanda' : 'Ho sentim! Comanda no activa';
    };


    ngOnInit() {
        this.activeSubscription = this.configService.getActive()
            .subscribe(
                (data) => {
                    this.isActive = data;
                    this.updateLabels();
                },
                (error) => {
                    console.log( error );
                }
            );

        this.orderDateSubscription = this.configService.getCurrentOrderDate()
            .subscribe(
                (data) => {
                    this.currentOrderDate = data.limitDate;
                }
            )
    }

    ngOnDestroy() {
        this.activeSubscription.unsubscribe();
        this.orderDateSubscription.unsubscribe();
    }

}
