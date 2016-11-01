import {Component} from '@angular/core';

import {ProductsService} from './services/products.service';
import {CategoriesService} from './services/categories.service';
import {TagsService} from './services/tags.service';
import {OrderService} from './services/order.service';

@Component( {
    selector: 'oms-root',
    templateUrl: './app.component.html',
    providers: [
        ProductsService,
        CategoriesService,
        TagsService,
        OrderService
    ]
} )
export class AppComponent {
}
