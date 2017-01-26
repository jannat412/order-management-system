import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserAdminComponent} from './user-admin/user-admin.component';
import {USER_ROUTING} from './user-routing.module';
import {DirectivesModule} from '../directives/directives.module';

@NgModule({
    declarations: [
        UserAdminComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        USER_ROUTING
    ]
})
export default class UserModule {}