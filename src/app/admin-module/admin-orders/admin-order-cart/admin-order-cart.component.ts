import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oms-admin-order-cart',
  templateUrl: './admin-order-cart.component.html'
})
export class AdminOrderCartComponent implements OnInit {
  private superTotal: number = 0;
  
  constructor() { }

  ngOnInit() {
  }

  closeOrder = () => {

  };
}
