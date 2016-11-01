import {Component} from '@angular/core';
import {ProductsService} from './services/products.service';
import {CategoriesService} from './services/categories.service';
import {TagsService} from './services/tags.service';

@Component( {
    selector: 'oms-root',
    templateUrl: './app.component.html',
    providers: [ProductsService, CategoriesService, TagsService]
} )
export class AppComponent {
}
