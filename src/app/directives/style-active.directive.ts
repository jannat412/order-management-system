import {Directive, ElementRef, Input, Renderer} from '@angular/core';

@Directive({
  selector: '[omsStyleActive]'
})
export class StyleActiveDirective {

  @Input('omsStyleActive') classActive: boolean;
  @Input() set omsStyleOk(className: string) {
    if(this.classActive && className) {
      this.renderer.setElementClass(this.el.nativeElement, className, true);
    }
  }
  @Input() set omsStyleKo(className: string) {
    if(!this.classActive && className) {
      this.renderer.setElementClass(this.el.nativeElement, className, true);
    }
  }
  constructor(private el: ElementRef, private renderer: Renderer){}


}
