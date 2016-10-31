import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ICategory} from '../models/category';

@Component({
  selector: 'oms-category-filter-menu',
  templateUrl: './category-filter-menu.component.html',
  styleUrls: ['./category-filter-menu.component.scss']
})
export class CategoryFilterMenuComponent implements OnInit {
  private categories: ICategory[];
  private errorMessage: string;
  private categoryFilter: string = '';
  @Output() private filterByCategory: EventEmitter<string>;
  @Output() private filterByActive: EventEmitter<boolean>;
  activeFilterStatus: boolean = true;
  activeMessage:string = 'Amagar';

  constructor(private productsService: ProductsService) {
    this.filterByCategory = new EventEmitter<string>();
    this.filterByActive = new EventEmitter<boolean>();
  }

  onFilterCategory = (category: string) => {
    this.categoryFilter = category;
    this.filterByCategory.emit( this.categoryFilter );
  };
  onFilterActive = () => {
    this.activeFilterStatus = !this.activeFilterStatus;
    this.filterByActive.emit( this.activeFilterStatus );
    this.activeMessage = this.activeFilterStatus ? 'Amagar' : 'Mostrar';
  };

  ngOnInit() {
    this.productsService.getCategories()
        .subscribe(
            (data: ICategory[]) => this.categories = <ICategory[]>data,
            (error: any)  => this.errorMessage = <any>error
        );
  }



}
