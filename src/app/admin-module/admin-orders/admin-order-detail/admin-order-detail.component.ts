import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {IOrder} from '../../../models/order';
import {AdminOrderService} from '../../../services-module/admin-order.service';
import {ConfigService} from '../../../services-module/config.service';
import {IUser} from '../../../models/user';
import {UserService} from '../../../services-module/user.service';
import {OrderUtils} from '../../../../utils/utils';
import {Location} from '@angular/common';
import {ICenter} from '../../../models/center';
import {ResumeDataService} from '../../../services-module/resume-data.service';

@Component( {
    selector: 'oms-admin-order-detail',
    templateUrl: './admin-order-detail.component.html'
} )
export class AdminOrderDetailComponent implements OnInit, OnDestroy {

    private routeParamSubscription: Subscription;
    private configCurrentOrderSubscription: Subscription;
    private order: IOrder;
    private deliverData: any = {
        deliverType: '',
        comment: '',
        center: '',
        address: ''
    };
    centers: ICenter[] = [];
    private selectedCenter: ICenter;
    private total: number;
    private oldTotal: number;
    private orderRevised: boolean = false;
    private currentOrderDate: string;
    private userId: string = null;
    private orderLines: any[] = [];
    private usedProducts: string[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private configService: ConfigService,
                private adminOrderService: AdminOrderService,
                private resumeDataService: ResumeDataService,
                private location: Location) {
    }

    ngOnInit() {

        this.resumeDataService.getCenters()
            .subscribe( centers => {
                this.centers = centers;
            } );

        this.routeParamSubscription = this.activatedRoute.params
            .flatMap( param => this.adminOrderService.getOrder( param[ 'key' ] ) )
            .distinctUntilChanged()
            .subscribe( data => {
                this.order = <IOrder>data;

                // used product keys
                let orderProducts = this.order.order;
                this.usedProducts = Object.keys( orderProducts );
                this.orderLines = OrderUtils.orderListToArray( orderProducts, true );

                this.userId = data.user;
                this.deliverData = data.deliverInfo;
                if (this.deliverData.center) this.onChangeCenter( this.deliverData.center );
                this.total = OrderUtils.getSuperTotal( this.orderLines, 'total' );
                this.oldTotal = OrderUtils.getSuperTotal( this.orderLines, 'oldTotal' );
                // revision done for current order
                this.orderRevised = this.orderLines.every( (element) => {
                    return element.status !== 0;
                } );
                if (this.order[ '$key' ]) {
                    this.adminOrderService
                        .setOrderStatus( this.order[ '$key' ], this.orderRevised );
                }

            } );

        this.configCurrentOrderSubscription =
            this.configService.getCurrentOrderDate()
                .subscribe(
                    (data) => this.currentOrderDate = data.limitDate
                );

    }

    ngOnDestroy() {
        this.routeParamSubscription.unsubscribe();
        this.configCurrentOrderSubscription.unsubscribe();
    }

    goBack = () => {
        this.location.back();
    };

    onChangeCenter = (center: string = 'nou-barris') => {
        this.selectedCenter = this.centers
                .find( item => {
                    return item.value === center;
                } ) || this.selectedCenter;
    };

}
