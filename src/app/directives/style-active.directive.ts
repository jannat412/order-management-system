import {Directive, ElementRef, Input, Renderer, OnInit} from '@angular/core';

@Directive( {
    selector: '[isActive]'
} )
export class StyleActiveDirective implements OnInit {

    @Input( 'isActive' ) classActive: boolean;
    @Input( 'styleOk' ) classOk: string;
    @Input( 'styleKo' ) classKo: string;

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    ngOnInit() {
        this.classActive ?
            this.applyClass( this.classOk ) : this.applyClass( this.classKo );
    }

    private applyClass = (cls: string): void => {
        this.renderer.setElementClass(
            this.el.nativeElement, cls, true );
    };
}
