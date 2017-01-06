import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductsService} from '../../services/products.service';
import {IProduct} from '../../models/product';
import {NameFilterInputComponent} from '../name-filter-input/name-filter-input.component';
import {CategoryFilterMenuComponent} from '../category-filter-menu/category-filter-menu.component';
import {OrderService} from '../../services/order.service';
import {IOrderLine} from '../../models/orderLine';

@Component( {
    selector: 'oms-order-list',
    templateUrl: 'products-list.component.html'
} )
export class ProductsListComponent implements OnInit {
    private products: IProduct[];
    private userOrderProducts: IOrderLine[] = [];
    private errorMessage: string;

    @ViewChild( NameFilterInputComponent )
    private nameFilterComponent: NameFilterInputComponent;
    @ViewChild( CategoryFilterMenuComponent )
    private categoryFilterComponent: CategoryFilterMenuComponent;

    listProductTitle: string = 'Llistat de productes';
    private listFilter: string = '';
    private categoryFilter: string = '';
    private activeFilter: boolean = true;
    private selectedFilter: boolean = false;

    constructor(private productsService: ProductsService,
                private orderService: OrderService) {
    }

    ngOnInit() {
        this.productsService.getProducts()
            .subscribe(
                (products: IProduct[]) => this.products = <IProduct[]>products,
                (error: any) => this.errorMessage = <any>error
            );

        this.orderService.getOrderLinesByUser().subscribe(
            (userOrderProducts: IOrderLine[]) =>
                this.userOrderProducts = <IOrderLine[]>userOrderProducts
        );

        // this.orderService.getProductsOrderLines()
        //     .subscribe(
        //         (data) => {
        //             console.log( data );
        //             this.productsLine = data
        //         }
        //     );

    }

    doFilter = (str: string) => {
        this.listFilter = str;
    };

    doFilterCategory = (categoryKey: string) => {
        this.categoryFilter = categoryKey;
    };

    doFilterActive = (active: boolean) => {
        this.activeFilter = active;
    };

    doFilterSelected = (selected: boolean) => {
        // reset all filters
        this.nameFilterComponent.clear();
        this.categoryFilterComponent.onFilterCategory( '' );
        this.categoryFilterComponent.onFilterActive( true );
        this.selectedFilter = selected;
    };

    getProductOrderLine = (productKey: string): any => {
        return this.userOrderProducts.filter( (product) => {
                return product['$key'] === productKey;
            } )[0] || {
                quantity: 0,
                total: 0
            }
    };
}
