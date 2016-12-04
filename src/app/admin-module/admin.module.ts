import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {adminRouting} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {AdminGuard} from '../services/admin.guard';

@NgModule( {
    imports: [
        CommonModule,
        adminRouting
    ],
    declarations: [AdminComponent],
    providers: [
        AdminGuard
    ]
} )
export class AdminModule {
}
