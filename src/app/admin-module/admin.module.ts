import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {adminRouting} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {AdminProductsBoxComponent} from './boxes/admin-products-box/admin-products-box.component';
import {AdminUsersBoxComponent} from './boxes/admin-users-box/admin-users-box.component';
import {AdminOrderBoxComponent} from './boxes/admin-order-box/admin-order-box.component';

@NgModule( {
    imports: [
        CommonModule,
        adminRouting
    ],
    declarations: [
        AdminComponent,
        AdminOrderBoxComponent,
        AdminProductsBoxComponent,
        AdminUsersBoxComponent
    ],
    providers: []
} )
export class AdminModule {
}
