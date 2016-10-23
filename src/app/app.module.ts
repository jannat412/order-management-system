import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AngularFireModule} from 'angularfire2';

import {routing} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {ProductsListComponent} from './products/products-list/products-list.component';

import {ProductFilterPipe} from './products/product-filter.pipe';
import {ProductTagsComponent} from './products/product-tags/product-tags.component';
import {NameFilterInputComponent} from './products/name-filter-input/name-filter-input.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {StyleActiveDirective} from './directives/style-active.directive';
import {DropdownDirective} from './directives/dropdown.directive';
import {ProductsCountComponent} from './products/products-count/products-count.component';
import {TouchspinComponent} from './directives/touchspin/touchspin.component';
import { CategoryFilterMenuComponent } from './products/category-filter-menu/category-filter-menu.component';

@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        ProductsListComponent,
        ProductFilterPipe,
        ProductTagsComponent,
        NameFilterInputComponent,
        ProductDetailComponent,
        StyleActiveDirective,
        DropdownDirective,
        ProductsCountComponent,
        TouchspinComponent,
        CategoryFilterMenuComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
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
