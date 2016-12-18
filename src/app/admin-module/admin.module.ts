import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {adminRouting} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {AdminBoxComponent} from './boxes/admin-box/admin-box.component';
import {ServicesModule} from '../services/services.module';

@NgModule( {
    imports: [
        CommonModule,
        ServicesModule.forAdmin(),
        adminRouting
    ],
    declarations: [
        AdminComponent,
        AdminBoxComponent
    ],
    providers: []
} )
export class AdminModule {
}
