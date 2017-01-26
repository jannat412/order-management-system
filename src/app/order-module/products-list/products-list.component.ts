import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {ProductsService} from '../../services-module/products.service';
import {IProduct} from '../../models/product';
import {NameFilterInputComponent} from '../name-filter-input/name-filter-input.component';
import {CategoryFilterMenuComponent} from '../category-filter-menu/category-filter-menu.component';
import {OrderService} from '../../services-module/order.service';
import {IOrderLine} from '../../models/orderLine';
import {Subscription} from 'rxjs/Subscription';

@Component( {
    selector: 'oms-order-list',
    templateUrl: 'products-list.component.html'
} )
export class ProductsListComponent implements OnInit, OnDestroy {
    private products: IProduct[];
    private userOrderProducts: IOrderLine[] = [];
    private errorMessage: string;

    @ViewChild( NameFilterInputComponent )
    private nameFilterComponent: NameFilterInputComponent;
    @ViewChild( CategoryFilterMenuComponent )
    private categoryFilterComponent: CategoryFilterMenuComponent;

    private listProductTitle: string = 'Llistat de productes';
    private listFilter: string = '';
    private categoryFilter: string = '';
    private activeFilter: boolean = true;
    private selectedFilter: boolean = false;

    private linesSubscription: Subscription;
    private productsSubscription: Subscription;
    private orderLinesSubscription: Subscription;

    constructor(private productsService: ProductsService,
                private orderService: OrderService) {
    }

    ngOnInit() {
        this.productsSubscription = this.productsService
            .getProducts()
            .subscribe(
                (products: IProduct[]) => this.products = <IProduct[]>products,
                (error: any) => this.errorMessage = <any>error
            );

        this.orderLinesSubscription = this.orderService
            .getOrderLinesByUser()
            .map( data => data.order )
            .subscribe(
                (userOrderProducts: IOrderLine[]) =>
                    this.userOrderProducts = <IOrderLine[]>userOrderProducts
            );

        this.linesSubscription = this.orderService
            .emittedOrder.subscribe(
                (userOrderProducts: IOrderLine[]) =>
                    this.userOrderProducts = <IOrderLine[]>userOrderProducts
            );

    }

    ngOnDestroy() {
        this.productsSubscription.unsubscribe();
        this.orderLinesSubscription.unsubscribe();
        this.linesSubscription.unsubscribe();
    }

    private doFilter = (str: string) => {
        this.listFilter = str;
    };

    private  doFilterCategory = (categoryKey: string) => {
        this.categoryFilter = categoryKey;
    };

    private doFilterActive = (active: boolean) => {
        this.activeFilter = active;
    };

    private doFilterSelected = (selected: boolean) => {
        // reset all filters
        this.nameFilterComponent.clear();
        this.categoryFilterComponent.onFilterCategory( '' );
        this.categoryFilterComponent.onFilterActive( true );
        this.selectedFilter = selected;
    };

    private getProductOrderLine = (productKey: string): any => {
        return this.userOrderProducts.filter( (product) => {
                return product[ '$key' ] === productKey;
            } )[ 0 ] || {
                quantity: 0,
                total: 0
            }
    };
}
