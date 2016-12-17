import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import '../rxjs-extensions';

import {AngularFireModule, WindowLocation} from 'angularfire2';
import {FirebaseConfig, FirebaseAuthConfig} from '../config/firebase.config';

import {mainRouting} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';

import {DropdownDirective} from './directives/dropdown.directive';
import {MenuCollapseDirective} from './directives/menu-collapse.directive';

import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {ConfigService} from './services/config.service';
import {OrderService} from './services/order.service';

import {AuthModule} from './auth-module/auth.module';
import {HomeComponent} from './home/home.component';
import {InactiveGuard} from './services/inactive.guard';
import {AuthGuard} from './services/auth.guard';
import {AdminGuard} from './services/admin.guard';

@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        DropdownDirective,
        MenuCollapseDirective,
        FooterComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AngularFireModule.initializeApp( FirebaseConfig, FirebaseAuthConfig ),
        AuthModule,
        mainRouting
    ],
    providers: [
        AuthService,
        UserService,
        ConfigService,
        OrderService,
        InactiveGuard,
        AuthGuard,
        AdminGuard,
        {
            provide: WindowLocation,
            useValue: {
                protocol: 'http' // Change to HTTP if you prefer.
            }
        }]
    ,
    bootstrap: [AppComponent]
} )
export class AppModule {
}
