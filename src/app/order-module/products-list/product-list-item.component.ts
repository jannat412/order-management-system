import { Component, Input, OnInit } from '@angular/core';
import {CategoriesService} from '../../services/categories.service';
import {IProduct} from '../../models/product';
import {ICategory} from '../../models/category';

@Component({
  selector: '.oms-product-list-item',
  templateUrl: './product-list-item.component.html'
})
export class ProductListItemComponent implements OnInit {
  @Input() product: IProduct;
  private category: ICategory;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categoriesService.getCategoryForProduct(this.product.categoryKey)
        .subscribe(
            (data: ICategory) => this.category = <ICategory>data
        );
  }

}
