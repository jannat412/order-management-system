import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DirectivesModule} from '../directives/directives.module';
import {RegisterComponent} from './register/register.component';

@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DirectivesModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent
    ]
} )
export class AuthModule {
}
