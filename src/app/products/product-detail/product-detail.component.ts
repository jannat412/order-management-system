import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Location} from '@angular/common';
import {IProduct} from '../product';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'oms-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Producte:';
  product: IProduct;
  errorMessage: string;

  constructor(
      private productsService: ProductsService,
      private route: ActivatedRoute,
      private location: Location) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.productsService.getProduct(id)
          .subscribe(
              (data: IProduct) => this.product = data,
              (error: any)  => this.errorMessage = <any>error
          );
    })
  }

  goBack(): void {
    this.location.back();
  }

}
