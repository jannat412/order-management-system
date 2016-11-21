import {Directive, HostListener, ElementRef} from '@angular/core';

@Directive( {
    selector: '[selectOnFocus]'
} )
export class SelectOnFocusDirective {

    constructor(private el: ElementRef) {}

    @HostListener( 'focus' ) hasClicked() {
        this.el.nativeElement.select();
    }

}
