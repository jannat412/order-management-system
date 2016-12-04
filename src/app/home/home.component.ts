import {Component, OnInit} from '@angular/core';
import {ConfigService} from '../services/config.service';
import {Subscription} from 'rxjs';
import {AngularFireDatabase, FirebaseUrl} from 'angularfire2';

@Component( {
    selector: 'oms-home',
    templateUrl: './home.component.html'
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
