import {Component, Input, OnInit} from '@angular/core';
import {AdminOrderService} from '../../../services-module/admin-order.service';
import {IProduct} from '../../../models/product';

@Component( {
    selector: 'oms-admin-order-product-add',
    templateUrl: './admin-order-product-add.component.html'
} )
export class AdminOrderProductAddComponent implements OnInit {
    @Input() orderKey: string;
    @Input() usedProducts: string[] = [];
    private listFilter: string;
    private products: IProduct[] = [];
    private emptyList: boolean = false;

    constructor(private adminOrderService: AdminOrderService) {
    }

    ngOnInit() {
    }

    search = (): void => {
        // search products activated and not used by string
        this.adminOrderService
            .getFilteredProducts( this.orderKey, this.listFilter, this.usedProducts )
            .subscribe( data => {
                    this.products = data;
                    this.emptyList = !this.products.length;
                },
                err => console.log( err ),
                () => {
                    this.emptyList = false;
                    this.products = [];
                } );
    };

    clear = (): void => {
        this.listFilter = '';
        this.search();
    };

    addProduct = (product: IProduct) => {
        this.adminOrderService.addProductToOrder(product, this.orderKey);
        this.clear();
    };
}
