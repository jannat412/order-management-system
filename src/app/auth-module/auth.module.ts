import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DirectivesModule} from '../directives/directives.module';
import {ResetPasswordComponent} from './resetPassword/reset-password.component';
import {RouterModule} from '@angular/router';
import {ServicesModule} from '../services-module/services.module';
import {ForgotPasswordComponent} from './forgotPassword/forgot-password.component';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule,
        RouterModule,
        ServicesModule.forAuth()
    ],
    declarations: [
        LoginComponent,
        ResetPasswordComponent,
        ForgotPasswordComponent
    ]
} )
export class AuthModule {
}
