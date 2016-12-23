import {Directive, HostListener, ElementRef} from '@angular/core';

@Directive( {
    selector: '[selectOnFocus]'
} )
export class SelectOnFocusDirective {

    @HostListener( 'click' ) hasClicked() {
        console.log(this.el);
        this.el.nativeElement.select();
    }

    constructor(private el: ElementRef) {}
}
