import { Component, Input } from '@angular/core';

@Component({
  selector: 'oms-admin-box',
  templateUrl: './admin-box.component.html'
})
export class AdminBoxComponent {

  @Input() private adminType;

}
