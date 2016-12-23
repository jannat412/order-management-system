import {NgModule} from '@angular/core';
import {adminRouting} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {AdminBoxComponent} from './boxes/admin-box/admin-box.component';
import {ServicesModule} from '../services/services.module';
import {AdminHomeComponent} from './admin-home.component';
import {AdminActiveAppComponent} from './boxes/active-app-box/admin-active-app.component';
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';
import {AdminTotalOrderComponent} from './admin-total-order/admin-total-order.component';
import {DirectivesModule} from '../directives/directives.module';

@NgModule( {
    imports: [
        CommonModule,
        ServicesModule.forAdmin(),
        DirectivesModule,
        adminRouting
    ],
    declarations: [
        AdminHomeComponent,
        AdminActiveAppComponent,
        AdminBoxComponent,
        AdminTotalOrderComponent,
        AdminOrdersComponent
    ],
    providers: []
} )
export class AdminModule {
}
