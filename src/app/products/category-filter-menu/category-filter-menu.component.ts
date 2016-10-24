import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {ICategory} from '../category';

@Component({
  selector: 'oms-category-filter-menu',
  templateUrl: './category-filter-menu.component.html',
  styleUrls: ['./category-filter-menu.component.scss']
})
export class CategoryFilterMenuComponent implements OnInit {
  private categories: ICategory[];
  private errorMessage: string;
  private listFilter: string = '';
  @Output() private filterBy: EventEmitter<string>;
  // @Output() private filterByActive: EventEmitter<boolean>;
  // activeFilterStatus: boolean = true;

  constructor(private productsService: ProductsService) {
    this.filterBy = new EventEmitter<string>();
    // this.filterByActive = new EventEmitter<boolean>();
  }

  onFilter = (category: string) => {
    this.listFilter = category;
    this.filterBy.emit( this.listFilter );
  };
  // onFilterByActive = () => {
  //   this.activeFilterStatus = !this.activeFilterStatus;
  //   this.filterByActive.emit( this.activeFilterStatus );
  // };


  ngOnInit() {
    this.productsService.getCategories()
        .subscribe(
            (data: ICategory[]) => this.categories = <ICategory[]>data,
            (error: any)  => this.errorMessage = <any>error
        );
  }



}
