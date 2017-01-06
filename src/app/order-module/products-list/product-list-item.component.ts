import { Component, Input, OnInit } from '@angular/core';
import {CategoriesService} from '../../services/categories.service';
import {IProduct} from '../../models/product';
import {ICategory} from '../../models/category';
import {IOrderLine} from '../../models/orderLine';
import {ICounterData} from '../../models/counterData';

@Component({
  selector: '.oms-product-list-item',
  templateUrl: './product-list-item.component.html'
})
export class ProductListItemComponent implements OnInit {
  @Input() product: IProduct;
  @Input() productOrderLine: IOrderLine;
  private category: ICategory;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategoryForProduct(this.product.categoryKey)
        .subscribe(
            (data: ICategory) => this.category = <ICategory>data
        );
  }

  createCounterData = (): ICounterData => {
    return {
      valuePerUnit: this.product.price,
      quantity: this.productOrderLine.quantity,
      step: this.product.step,
      totalMeasurementUnit: '€',
      total: this.productOrderLine.total
    };
  };

}
