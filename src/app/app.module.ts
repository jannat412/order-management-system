import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AngularFireModule} from 'angularfire2';

import {OrderManagementRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ProductsListComponent} from './products/products-list/products-list.component';

import {ProductFilterPipe} from './products/product-filter.pipe';
import {ProductTagsComponent} from './products/product-tags/product-tags.component';
import {FilterListComponent} from './products/filter-list/filter-list.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {StyleActiveDirective} from './directives/style-active.directive';
import {DropdownDirective} from './directives/dropdown.directive';
import {ProductsCountComponent} from './products/products-count/products-count.component';
import {TouchspinComponent} from './directives/touchspin/touchspin.component';

@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        ProductsListComponent,
        ProductFilterPipe,
        ProductTagsComponent,
        FilterListComponent,
        ProductDetailComponent,
        StyleActiveDirective,
        DropdownDirective,
        ProductsCountComponent,
        TouchspinComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        OrderManagementRoutingModule,
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
