import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StyleActiveDirective} from './style-active.directive';
import {SelectOnFocusDirective} from './select-on-focus.directive';

@NgModule( {
    imports: [
        CommonModule
    ],
    declarations: [
        StyleActiveDirective,
        SelectOnFocusDirective
    ],
    providers: [],
    exports: [
        StyleActiveDirective,
        SelectOnFocusDirective
    ]
} )
export class DirectivesModule {
}
