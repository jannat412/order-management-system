import {Routes, RouterModule} from '@angular/router';

import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {ProductsListComponent} from './products/products-list/products-list.component';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/comanda', pathMatch: 'full'},
    {path: 'comanda', component: ProductsListComponent},
    {path: 'producte/:id', component: ProductDetailComponent},
    {path: '**', redirectTo: '/comanda'}
];

export const routing = RouterModule.forRoot( APP_ROUTES );