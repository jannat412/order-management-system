import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {ProductsListComponent} from './products/products-list/products-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/comanda', pathMatch: 'full'},
  {path: 'comanda', component: ProductsListComponent},
  {path: 'producte/:id', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class OrderManagementRoutingModule { }
