import {Directive, ElementRef, Input, Renderer, OnInit} from '@angular/core';

@Directive({
  selector: '[isActive]'
})
export class StyleActiveDirective {

  @Input('isActive') classActive: boolean;
  @Input('styleOk') classOk: string;
  @Input('styleKo') classKo: string;
  constructor(private el: ElementRef, private renderer: Renderer){}

  ngOnInit() {
    if(this.classOk) {
      this.renderer.setElementClass( this.el.nativeElement, this.classOk, this.classActive);
    }
    if(this.classKo) {
      this.renderer.setElementClass(this.el.nativeElement, this.classKo, !this.classActive);
    }
  }
}
