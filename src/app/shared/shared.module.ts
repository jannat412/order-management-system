import {NgModule} from '@angular/core';
import {ProductCountComponent} from './product-count/product-count.component';
import {TouchspinComponent} from '../directives/touchspin/touchspin.component';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        ProductCountComponent,
        TouchspinComponent
    ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ProductCountComponent,
        TouchspinComponent
    ]
})
export class SharedModule {}