import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AngularFireModule} from 'angularfire2';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {OrderListComponent} from './products/order-list.component';

import {ProductFilterPipe} from './products/product-filter.pipe';

@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        OrderListComponent,
        ProductFilterPipe
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AngularFireModule.initializeApp( {
            apiKey: 'AIzaSyDlLSQRaaJHlo7FSEQwRjGr75Wq4oWmHtU',
            authDomain: 'el-llevat-24226.firebaseapp.com',
            databaseURL: 'https://el-llevat-24226.firebaseio.com',
            storageBucket: ''
        } )
    ],
    providers: [],
    bootstrap: [AppComponent]
} )
export class AppModule {
}
