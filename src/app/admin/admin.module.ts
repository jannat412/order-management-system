import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {adminRouting} from './admin-routing.module';

@NgModule( {
    imports: [
        adminRouting
    ],
    declarations: [AdminComponent]
} )
export class AdminModule {
}
