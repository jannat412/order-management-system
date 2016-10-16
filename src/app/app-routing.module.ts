import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {OrderListComponent} from './products/order-list/order-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/comanda', pathMatch: 'full'},
  {path: 'comanda', component: OrderListComponent},
  {path: 'producte/:id', component: ProductDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class OrderManagementRoutingModule { }
