import {Directive, HostBinding, HostListener, ElementRef, Renderer} from '@angular/core';

@Directive({
  selector: '[menuCollapse]'
})
export class MenuCollapseDirective {
  @HostBinding('class.in') isOpen: boolean = false;

  @HostListener('click')
  hasClicked() {
    this.isOpen = !this.isOpen;
    this.renderer
        .setElementClass(this.el.nativeElement
            .parentNode
            .parentNode
            .querySelector('.navbar-collapse'), 'in', this.isOpen);
  }

  constructor(private el: ElementRef, private renderer: Renderer) {}
}
