import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'oms-admin-box',
  templateUrl: './admin-box.component.html'
})
export class AdminBoxComponent implements OnInit {

  @Input() adminType;
  constructor() { }

  ngOnInit() {
  }

}
