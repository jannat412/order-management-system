import { Component, Input, OnInit } from '@angular/core';
import {IProduct} from '../../../models/product';
import {ProductsService} from '../../../services/products.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: '.oms-admin-order-detail-list-item',
  templateUrl: './admin-order-detail-item.component.html'
})
export class AdminOrderDetailItemComponent implements OnInit {
  @Input() orderLine: any;
  private product: IProduct;
  @Input() index: number;
  private productSubscription: Subscription;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
      this.productSubscription = this.productsService
          .getProduct(this.orderLine.key, 'thumbs')
          .subscribe(
              (product: IProduct) => {
                this.product = <IProduct>product;
              }
          );
  }

}
