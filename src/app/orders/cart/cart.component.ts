import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'oms-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  superTotal: number = 0;
  constructor() { }

  ngOnInit() {
  }

}
