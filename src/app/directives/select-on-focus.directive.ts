import {Directive, HostListener, ElementRef} from '@angular/core';

@Directive( {
    selector: '[selectOnFocus]'
} )
export class SelectOnFocusDirective {

    @HostListener( 'focus' ) hasClicked() {
        this.el.nativeElement.select();
    }

    constructor(private el: ElementRef) {}
}
