import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {AdminOrderService} from '../../services/admin-order.service';
import {IOrder} from '../../models/order';

@Component({
  selector: 'oms-admin-orders',
  templateUrl: './admin-orders.component.html'
})
export class AdminOrdersComponent implements OnInit {

  orders: IOrder[];
  currentOrdersSubscription: Subscription;

  constructor(private adminOrderService: AdminOrderService) { }

  ngOnInit() {
    this.currentOrdersSubscription =
        this.adminOrderService.getCurrentOrdersByUser()
            .subscribe(
                (data: IOrder[]) => {
                  console.log(data);
                  this.orders = <IOrder[]>data
                }
            );
  }

}
