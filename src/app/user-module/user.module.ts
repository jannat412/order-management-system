import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserAdminComponent} from './user-admin/user-admin.component';
import {USER_ROUTING} from './user-routing.module';

@NgModule({
    declarations: [
        UserAdminComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        USER_ROUTING
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export default class UserModule {}