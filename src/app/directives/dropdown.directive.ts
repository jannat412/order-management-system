import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[dropDown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;
  @HostListener('click') hasClicked() {
    this.isOpen = true;
  }
  @HostListener('mouseleave') hasLeaved() {
    this.isOpen = false;
  }

}
