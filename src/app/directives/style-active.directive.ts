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
        if (this.classOk) {
            this.applyClass( this.classOk, this.classActive );
        }
        if (this.classKo) {
            this.applyClass( this.classKo, !this.classActive );
        }
    }

    applyClass = (cls: string, isApplied: boolean): void => {
        this.renderer.setElementClass(
            this.el.nativeElement, cls, isApplied );
    };
}
