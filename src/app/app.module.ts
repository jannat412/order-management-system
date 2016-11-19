import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AngularFireModule, WindowLocation} from 'angularfire2';
import {FirebaseConfig, FirebaseAuthConfig} from '../config/firebase.config';

import {routing} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

import {DropdownDirective} from './directives/dropdown.directive';

import {AuthGuard} from './services/auth.guard';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';

import {ProductsModule} from './products/products.module';
import {AuthModule} from './auth/auth.module';
import {AdminGuard} from './services/admin.guard';
import {ConfigService} from './services/config.service';
import { InactiveAppComponent } from './inactive-app/inactive-app.component';
import {InactiveGuard} from './services/inactive.guard';
import { HomeComponent } from './home/home.component';

@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        DropdownDirective,
        FooterComponent,
        InactiveAppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        routing,
        AngularFireModule.initializeApp( FirebaseConfig, FirebaseAuthConfig ),
        ProductsModule,
        AuthModule
    ],
    providers: [
        AuthGuard,
        AdminGuard,
        InactiveGuard,
        AuthService,
        UserService,
        ConfigService,
        {
            provide: WindowLocation, useValue: {
            protocol: 'http' // Change to HTTP if you prefer.
        }
        }]
    ,
    bootstrap: [AppComponent]
} )
export class AppModule {}
