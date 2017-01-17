import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import '../rxjs-extensions';

import {AngularFireModule, WindowLocation} from 'angularfire2';
import {FirebaseConfig, FirebaseAuthConfig} from '../config/firebase.config';

import {mainRouting} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {HomeComponent} from './home/home.component';

import {DropdownDirective} from './directives/dropdown.directive';
import {MenuCollapseDirective} from './directives/menu-collapse.directive';

import {AuthModule} from './auth-module/auth.module';
import {ServicesModule} from './services-module/services.module';

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
        ServicesModule.forRoot(),
        AuthModule,
        mainRouting
    ],
    providers: [
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
