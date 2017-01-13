import {NgModule} from '@angular/core';
import {adminRouting} from './admin-routing.module';
import {AdminBoxComponent} from './boxes/admin-box/admin-box.component';
import {ServicesModule} from '../services/services.module';
import {AdminHomeComponent} from './admin-home.component';
import {AdminActiveAppComponent} from './boxes/active-app-box/admin-active-app.component';
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';
import {AdminTotalOrderComponent} from './admin-total-order/admin-total-order.component';
import {DirectivesModule} from '../directives/directives.module';
import {AdminOrderRowComponent} from './admin-orders/admin-order-row.component';
import {AdminOrderDetailComponent} from './admin-orders/admin-order-detail/admin-order-detail.component';
import {AdminOrderDetailItemComponent} from './admin-orders/admin-order-detail/admin-order-detail-item.component';
import {SharedModule} from '../shared/shared.module';
import {AdminOrderCartComponent} from './admin-orders/admin-order-cart/admin-order-cart.component';
import {AdminOrderProductAddComponent} from './admin-orders/admin-order-product-add/admin-order-product-add.component';

@NgModule( {
    imports: [
        SharedModule,
        ServicesModule.forAdmin(),
        DirectivesModule,
        adminRouting
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
        AdminOrderProductAddComponent
    ],
    providers: []
} )
export default class AdminModule {
}
