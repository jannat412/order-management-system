import {NgModule} from '@angular/core';

import {ProductsSelectionComponent} from './products-selection/products-selection.component';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductFilterPipe} from './filter-pipes/product-filter.pipe';
import {ProductCategoryFilterPipe} from './filter-pipes/product-category-filter.pipe';
import {ProductActiveFilterPipe} from './filter-pipes/product-active-filter.pipe';
import {ProductSelectedFilterPipe} from './filter-pipes/product-selected-filter.pipe';
import {ProductTagsComponent} from './product-tags/product-tags.component';
import {NameFilterInputComponent} from './name-filter-input/name-filter-input.component';
import {CategoryFilterMenuComponent} from './category-filter-menu/category-filter-menu.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductCountComponent} from './product-count/product-count.component';
import {TouchspinComponent} from '../directives/touchspin/touchspin.component';
import {CartComponent} from './cart/cart.component';
import {ResumeComponent} from './resume/resume.component';

import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {StyleActiveDirective} from '../directives/style-active.directive';
import {SelectOnFocusDirective} from '../directives/select-on-focus.directive';
import {orderRouting} from './order-routing.module';
import {ProductsService} from '../services/products.service';
import {CategoriesService} from '../services/categories.service';
import {TagsService} from '../services/tags.service';
import {ServicesModule} from '../services/services.module';

@NgModule( {
    declarations: [
        ProductsListComponent,
        ProductFilterPipe,
        ProductCategoryFilterPipe,
        ProductActiveFilterPipe,
        ProductSelectedFilterPipe,
        ProductTagsComponent,
        NameFilterInputComponent,
        CategoryFilterMenuComponent,
        ProductDetailComponent,
        ProductCountComponent,
        ResumeComponent,
        TouchspinComponent,
        ProductsSelectionComponent,
        CartComponent,
        StyleActiveDirective,
        SelectOnFocusDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ServicesModule.forOrder(),
        orderRouting
    ],
    providers: [
    ]
} )
export class OrderModule {}