import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services-module/config.service';
import {OrderService} from '../../services-module/order.service';
import {UserService} from '../../services-module/user.service';
import {IOrderLine} from '../../models/orderLine';
import {AuthService} from '../../services-module/auth.service';
import {IUser} from '../../models/user';

@Component( {
    selector: 'oms-resume',
    templateUrl: './resume.component.html'
} )
export class ResumeComponent implements OnInit, OnDestroy {
    resumeForm: FormGroup;
    superTotal: number = 0;
    deliverData: any;
    orderSaved: boolean = false;
    currentOrderDate: string;
    currentDateSubscription: Subscription;
    linesSubscription: Subscription;
    saveSubscription: Subscription;
    totalAmountSubscription: Subscription;
    userAddressSubscription: Subscription;
    productLines: IOrderLine[] = [];
    user: IUser;
    deliverMethods: any[] = [
        {
            value: 'center',
            desc: 'Ja passo jo a recollir-ho'
        },
        {
            value: 'home',
            desc: 'Porteu-m\'ho a casa'
        } ];

    centers: any[] = [
        {
            value: 'nou-barris',
            desc: 'Nou Barris'
        },
        {
            value: 'gracia',
            desc: 'Gràcia'
        },
        {
            value: 'sant-andreu',
            desc: 'Sant Andreu'
        },
    ];
    selectedDeliveryType = this.deliverMethods[ 0 ];
    selectedCenter = this.centers[ 0 ];


    constructor(private orderService: OrderService,
                private configService: ConfigService,
                private authService: AuthService,
                private userService: UserService,
                private fb: FormBuilder) {
    }

    saveOrder = () => {
        console.log( this.resumeForm );
        //this.orderService.saveComment( this.comment );
        //this.orderService.saveOrder();
    };

    ngOnInit() {
        this.resumeForm = this.fb.group( {
            deliver: [ this.selectedDeliveryType.value, Validators.required ],
            center: [ this.selectedCenter.value, Validators.required ],
            address: [ {value: '', disabled: false}, Validators.required ],
            deliveryTime0: ['17:00', Validators.required],
            deliveryTime1: ['21:00', Validators.required],
            comment: ''
        } );

        this.onChangeTypeOfDelivery();

        this.resumeForm.get( 'deliver' ).valueChanges
            .subscribe( value => this.onChangeTypeOfDelivery( value ) );

        this.linesSubscription = this.orderService.getOrderLinesByUser()
            .subscribe( data => {
                this.productLines = data.order;
                this.deliverData = data.deliverData;
                this.resumeForm.patchValue( {
                    comment: data.comment
                } );
            } );

        this.currentDateSubscription = this.configService.getCurrentOrderDate()
            .subscribe( data => this.currentOrderDate = data.limitDate );

        this.saveSubscription = this.orderService.saveOrderEmitter
            .subscribe( data => this.orderSaved = data.status || false );

        this.totalAmountSubscription = this.orderService.pushTotalAmount
            .subscribe( data => this.superTotal = data );

        this.userAddressSubscription = this.authService.getUserId()
            .flatMap( uid => this.userService.getUserData( uid ) )
            .subscribe( user => {
                this.resumeForm.patchValue( {
                    address: `${user.address}, ${user.city} (${user.cp})`
                } );
            } );
    }

    ngOnDestroy() {
        this.currentDateSubscription.unsubscribe();
        this.linesSubscription.unsubscribe();
        this.saveSubscription.unsubscribe();
        this.totalAmountSubscription.unsubscribe();
        this.userAddressSubscription.unsubscribe();
    }

    onChangeTypeOfDelivery = (deliveryType: string = 'center') => {

        if (deliveryType === 'home') {
            this.resumeForm.get( 'address' ).enable();
            this.resumeForm.get( 'center' ).disable();
            this.resumeForm.get( 'deliveryTime0' ).enable();
            this.resumeForm.get( 'deliveryTime1' ).enable();
        } else {
            this.resumeForm.get( 'address' ).disable();
            this.resumeForm.get( 'center' ).enable();
            this.resumeForm.get( 'deliveryTime0' ).disable();
            this.resumeForm.get( 'deliveryTime1' ).disable();
        }

        this.selectedDeliveryType = this.deliverMethods
                .filter( item => {
                    return item.value === deliveryType;
                } )[ 0 ] || this.selectedDeliveryType;
    };

}
