import {Component} from '@angular/core';
import {ProductsService} from './services/products.service';

@Component( {
    selector: 'oms-root',
    templateUrl: './app.component.html',
    providers: [ProductsService]
} )
export class AppComponent {
}
