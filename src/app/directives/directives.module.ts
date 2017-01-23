import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SelectOnFocusDirective} from './select-on-focus.directive';

@NgModule( {
    imports: [
        CommonModule
    ],
    declarations: [
        SelectOnFocusDirective
    ],
    providers: [],
    exports: [
        SelectOnFocusDirective
    ]
} )
export class DirectivesModule {
}
