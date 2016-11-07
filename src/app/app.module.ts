import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AngularFireModule, WindowLocation} from 'angularfire2';
import {FirebaseConfig} from '../config/firebase.config';

import {routing} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {ProductsListComponent} from './products/products-list/products-list.component';

import {ProductFilterPipe} from './products/filter-pipes/product-filter.pipe';
import {ProductCategoryFilterPipe} from './products/filter-pipes/product-category-filter.pipe';
import {ProductActiveFilterPipe} from './products/filter-pipes/product-active-filter.pipe';
import {ProductSelectedFilterPipe} from './products/filter-pipes/product-selected-filter.pipe';
import {ProductTagsComponent} from './products/product-tags/product-tags.component';
import {NameFilterInputComponent} from './products/name-filter-input/name-filter-input.component';
import {CategoryFilterMenuComponent} from './products/category-filter-menu/category-filter-menu.component';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {StyleActiveDirective} from './directives/style-active.directive';
import {DropdownDirective} from './directives/dropdown.directive';
import {ProductCountComponent} from './products/product-count/product-count.component';
import {TouchspinComponent} from './directives/touchspin/touchspin.component';

import { CartComponent } from './orders/cart/cart.component';
import { ProductsSelectionComponent } from './products/products-selection/products-selection.component';

@NgModule( {
    declarations: [
        AppComponent,
        HeaderComponent,
        ProductsListComponent,
        ProductFilterPipe,
        ProductCategoryFilterPipe,
        ProductActiveFilterPipe,
        ProductSelectedFilterPipe,
        ProductTagsComponent,
        NameFilterInputComponent,
        CategoryFilterMenuComponent,
        ProductDetailComponent,
        StyleActiveDirective,
        DropdownDirective,
        ProductCountComponent,
        TouchspinComponent,
        FooterComponent,
        CartComponent,
        ProductsSelectionComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        AngularFireModule.initializeApp( FirebaseConfig )
    ],
    providers: [{
        provide: WindowLocation, useValue: {
            protocol: 'http' // Change to HTTP if you prefer.
        }
    }]
    ,
    bootstrap: [AppComponent]
} )
export class AppModule {
}
