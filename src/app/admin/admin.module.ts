import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {adminRouting} from './admin-routing.module';
import {CommonModule} from '@angular/common';

@NgModule( {
    imports: [
        CommonModule,
        adminRouting
    ],
    declarations: [AdminComponent]
} )
export class AdminModule {
}
