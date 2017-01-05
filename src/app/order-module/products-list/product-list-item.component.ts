import { Component, Input, OnInit } from '@angular/core';
import {CategoriesService} from '../../services/categories.service';
import {IProduct} from '../../models/product';
import {ICategory} from '../../models/category';
import {OrderService} from '../../services/order.service';
import {IOrderLine} from '../../models/orderLine';

@Component({
  selector: '.oms-product-list-item',
  templateUrl: './product-list-item.component.html'
})
export class ProductListItemComponent implements OnInit {
  @Input() product: IProduct;
  @Input() productOrderLine: IOrderLine;
  private category: ICategory;

  constructor(private categoriesService: CategoriesService,
              private orderService: OrderService) { }

  ngOnInit() {
    this.categoriesService.getCategoryForProduct(this.product.categoryKey)
        .subscribe(
            (data: ICategory) => this.category = <ICategory>data
        );

    // this.orderService.getOrderLineByKey(this.product.$key)
    //     .subscribe(
    //         (productOrderLine: IOrderLine) => {
    //                   console.log( productOrderLine );
    //                   this.productOrderLine = <IOrderLine>productOrderLine;
    //               }
    //     );

  }

}
