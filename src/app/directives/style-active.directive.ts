import {Directive, ElementRef, Input, Renderer, OnInit} from '@angular/core';

@Directive({
  selector: '[omsStyleActive]'
})
export class StyleActiveDirective {

  @Input('omsStyleActive') classActive: boolean;
  @Input('omsStyleOk') classOk: string;
  @Input('omsStyleKo') classKo: string;
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
