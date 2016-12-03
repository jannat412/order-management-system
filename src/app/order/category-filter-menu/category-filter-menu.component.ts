import {Component, OnInit, EventEmitter, Output} from '@angular/core';

import {CategoriesService} from '../../services/categories.service';

import {ICategory} from '../../models/category';

@Component( {
    selector: 'oms-category-filter-menu',
    templateUrl: './category-filter-menu.component.html'
} )
export class CategoryFilterMenuComponent implements OnInit {
    private categories: ICategory[];
    private errorMessage: string;
    private categoryFilter: string = '';
    @Output() private filterByCategory: EventEmitter<string> = new EventEmitter<string>();
    @Output() private filterByActive: EventEmitter<boolean> = new EventEmitter<boolean>();
    private activeFilterStatus: boolean = true;
    private activeMessage: string;

    constructor(private categoriesService: CategoriesService) {
    }

    onFilterCategory = (categoryKey: string) => {
        this.categoryFilter = categoryKey;
        this.filterByCategory.emit( this.categoryFilter );
    };
    onFilterActive = (value?: boolean) => {
        this.activeFilterStatus = value || !this.activeFilterStatus;
        this.filterByActive.emit( this.activeFilterStatus );
        this.activeMessage = this.getMessage();
    };

    private getMessage = () => this.activeFilterStatus ? 'Amaga els' : 'Ensenya\'m els';

    ngOnInit() {
        this.activeMessage = this.getMessage();
        this.categoriesService.getCategories()
            .subscribe(
                (data: ICategory[]) => this.categories = <ICategory[]>data,
                (error: any) => this.errorMessage = <any>error
            );
    }

}
