import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {ConfigService} from '../../services-module/config.service';
import {OrderService} from '../../services-module/order.service';
import {UserService} from '../../services-module/user.service';
import {IOrderLine} from '../../models/orderLine';
import {AuthService} from '../../services-module/auth.service';
import {IUser} from '../../models/user';
import {ResumeDataService} from '../../services-module/resume-data.service';
import {IDeliverMethod} from '../../models/deliverMethod';
import {ICenter} from '../../models/center';

@Component( {
    selector: 'oms-resume',
    templateUrl: './resume.component.html'
} )
export class ResumeComponent implements OnInit, OnDestroy {
    private resumeForm: FormGroup;
    private superTotal: number = 0;
    private deliverData: any = {
        deliverType: '',
        comment: '',
        center: '',
        address: ''
    };
    private orderSaved: boolean = false;
    private currentOrderDate: string;
    private currentDateSubscription: Subscription;
    private linesSubscription: Subscription;
    private saveSubscription: Subscription;
    private totalAmountSubscription: Subscription;
    private userAddressSubscription: Subscription;
    private productLines: IOrderLine[] = [];
    private user: IUser;
    private deliverMethods: IDeliverMethod[] = [];
    private centers: ICenter[] = [];
    private selectedDeliveryType: IDeliverMethod;
    private selectedCenter: ICenter;
    private officialAddress: string;

    constructor(private orderService: OrderService,
                private configService: ConfigService,
                private authService: AuthService,
                private userService: UserService,
                private resumeDataService: ResumeDataService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        // Form Builder
        this.resumeForm = this.fb.group( {
            deliverType: [ '', Validators.required ],
            center: [ '', Validators.required ],
            address: [ {value: '', disabled: false}, Validators.required ],
            comment: ''
        } );

        // Populate radio btns
        this.resumeDataService.getDeliverMethods()
            .subscribe( methods => {
                this.deliverMethods = methods;
                this.onChangeTypeOfDelivery();
                this.resumeForm.patchValue( {
                    deliverType: this.selectedDeliveryType.value
                } );
            } );

        // Populate select field
        this.resumeDataService.getCenters()
            .subscribe( centers => {
                this.centers = centers;
                this.onChangeCenter();
                this.resumeForm.patchValue( {
                    center: this.selectedCenter.value
                } );
            } );

        // listen for type changes (radio btn)
        this.resumeForm.get( 'deliverType' ).valueChanges
            .subscribe( value => this.onChangeTypeOfDelivery( value ) );
        // listen for center changes (select field)
        this.resumeForm.get( 'center' ).valueChanges
            .subscribe( value => this.onChangeCenter( value ) );

        // get firebase order data
        this.linesSubscription = this.orderService.getOrderLinesByUser()
            .subscribe( data => {
                this.productLines = data.order;
                this.deliverData = data.deliverInfo;
                this.onChangeCenter(this.deliverData.center);

                this.resumeForm.patchValue( {
                    deliverType: this.deliverData.deliverType,
                    comment: this.deliverData.comment,
                    address: this.deliverData.address || this.officialAddress,
                    center: this.selectedCenter.value
                } );

            } );

        // current final date for current week order
        this.currentDateSubscription = this.configService.getCurrentOrderDate()
            .subscribe( data => this.currentOrderDate = data.limitDate );

        // listen to emmit observable from order Service when order saved to
        // show and hide template areas
        this.saveSubscription = this.orderService.saveOrderEmitter
            .subscribe( data => this.orderSaved = data.status || false );

        // total amount of order
        this.totalAmountSubscription = this.orderService.pushTotalAmount
            .subscribe( data => this.superTotal = data );

        // official address from user profile
        this.userAddressSubscription = this.authService.getUserId()
            .flatMap( uid => this.userService.getUserData( uid ) )
            .subscribe( user => {
                this.officialAddress = `${user.address}, ${user.city} (${user.cp})`;
                if (!this.deliverData.address.length) {
                    this.resumeForm.patchValue( {
                        address: this.officialAddress
                    } );
                }
            } );
    }

    ngOnDestroy() {
        this.currentDateSubscription.unsubscribe();
        this.linesSubscription.unsubscribe();
        this.saveSubscription.unsubscribe();
        this.totalAmountSubscription.unsubscribe();
        this.userAddressSubscription.unsubscribe();
    }

    private onChangeTypeOfDelivery = (deliveryType: string = 'center') => {
        if (deliveryType === 'home') {
            this.resumeForm.get( 'address' ).enable();
            this.resumeForm.get( 'center' ).disable();
        } else {
            this.resumeForm.get( 'address' ).disable();
            this.resumeForm.get( 'center' ).enable();
        }

        this.selectedDeliveryType = this.deliverMethods
                .find( item => {
                    return item.value === deliveryType;
                } ) || this.selectedDeliveryType;
    };

    private onChangeCenter = (center: string = 'nou-barris') => {
        this.selectedCenter = this.centers
                .find( item => {
                    return item.value === center;
                } ) || this.selectedCenter;
    };

    private saveOrder = () => {
        this.orderService.saveOrder( this.resumeForm.value );
    };

}
