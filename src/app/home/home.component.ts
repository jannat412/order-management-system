import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../services/config.service';
import {Subscription} from 'rxjs';

@Component( {
    selector: 'oms-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
} )
export class HomeComponent implements OnInit {

    activeSubscription: Subscription;
    orderDateSubscription: Subscription;
    isActive: boolean = false;
    currentOrderDate: string;
    activeLabel: string;

    constructor(private configService: ConfigService) {}

    updateLabels = () => {
        this.activeLabel =
            this.isActive ?
                '<h2>Ja pots fer la teva comanda</h2>' :
                '<h2>Ho sentim! Comanda no activa</h2><p>Normalment la comanda es pot fer entre dijous al tard i dilluns de matí.</p>';
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
