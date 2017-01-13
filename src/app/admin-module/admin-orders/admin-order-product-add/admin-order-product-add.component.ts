import {Component, Input, OnInit} from '@angular/core';
import {AdminOrderService} from '../../../services/admin-order.service';
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
            } );
    };

    clear = (): void => {
        this.listFilter = '';
        this.search();
    };
}
