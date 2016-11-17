import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {adminRouting} from './admin-routing.module';

@NgModule( {
    imports: [
        CommonModule,
        adminRouting
    ],
    declarations: [AdminComponent]
} )
export class AdminModule {
}
