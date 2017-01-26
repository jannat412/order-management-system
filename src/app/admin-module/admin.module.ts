import {NgModule} from '@angular/core';
import {ADMIN_ROUTING} from './admin-routing.module';
import {AdminBoxComponent} from './boxes/admin-box/admin-box.component';
import {ServicesModule} from '../services-module/services.module';
import {AdminHomeComponent} from './admin-home.component';
import {AdminActiveAppComponent} from './boxes/active-app-box/admin-active-app.component';
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';
import {AdminTotalOrderComponent} from './admin-total-order/admin-total-order.component';
import {DirectivesModule} from '../directives/directives.module';
import {AdminOrderRowComponent} from './admin-orders/admin-order-row.component';
import {AdminOrderDetailComponent} from './admin-orders/admin-order-detail/admin-order-detail.component';
import {AdminOrderDetailItemComponent} from './admin-orders/admin-order-detail/admin-order-detail-item.component';
import {SharedModule} from '../shared-module/shared.module';
import {AdminOrderCartComponent} from './admin-orders/admin-order-cart/admin-order-cart.component';
import {AdminOrderProductAddComponent} from './admin-orders/admin-order-product-add/admin-order-product-add.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {AdminUserAddComponent} from './admin-users/admin-user-add/admin-user-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UiSwitchModule} from 'angular2-ui-switch';

@NgModule( {
    imports: [
        SharedModule,
        ServicesModule.forAdmin(),
        DirectivesModule,
        FormsModule,
        ReactiveFormsModule,
        UiSwitchModule,
        ADMIN_ROUTING
    ],
    declarations: [
        AdminHomeComponent,
        AdminActiveAppComponent,
        AdminBoxComponent,
        AdminTotalOrderComponent,
        AdminOrdersComponent,
        AdminOrderRowComponent,
        AdminOrderDetailComponent,
        AdminOrderDetailItemComponent,
        AdminOrderCartComponent,
        AdminOrderProductAddComponent,
        AdminUsersComponent,
        AdminUserAddComponent
    ],
    providers: []
} )
export default class AdminModule {}
