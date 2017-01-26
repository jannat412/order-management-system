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
import {CartComponent} from './cart/cart.component';
import {ResumeComponent} from './resume/resume.component';

import {RouterModule} from '@angular/router';

import {ORDER_ROUTING} from './order-routing.module';
import {ServicesModule} from '../services-module/services.module';
import {ProductListItemComponent} from './products-list/product-list-item.component';
import {DirectivesModule} from '../directives/directives.module';
import {SharedModule} from '../shared-module/shared.module';

@NgModule( {
    declarations: [
        ProductsListComponent,
        ProductListItemComponent,
        ProductFilterPipe,
        ProductCategoryFilterPipe,
        ProductActiveFilterPipe,
        ProductSelectedFilterPipe,
        ProductTagsComponent,
        NameFilterInputComponent,
        CategoryFilterMenuComponent,
        ProductDetailComponent,
        ResumeComponent,
        ProductsSelectionComponent,
        CartComponent
    ],
    imports: [
        SharedModule,
        RouterModule,
        ServicesModule.forOrder(),
        DirectivesModule,
        ORDER_ROUTING
    ],
    providers: [
    ]
} )
export default class OrderModule {}
