import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AngularFireModule, WindowLocation} from 'angularfire2';
import {FirebaseConfig, FirebaseAuthConfig} from '../config/firebase.config';

import {routing} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

import {DropdownDirective} from './directives/dropdown.directive';

import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './services/auth.guard';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';

import {AdminModule} from './admin/admin.module';
import {ProductsModule} from './products/products.module';

@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        DropdownDirective,
        FooterComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        routing,
        AngularFireModule.initializeApp( FirebaseConfig, FirebaseAuthConfig ),
        AdminModule,
        ProductsModule
    ],
    providers: [
        AuthGuard,
        AuthService,
        UserService,
        {
            provide: WindowLocation, useValue: {
            protocol: 'http' // Change to HTTP if you prefer.
        }
        }]
    ,
    bootstrap: [AppComponent]
} )
export class AppModule {
}
