import {Routes, RouterModule} from '@angular/router';
import {AdminHomeComponent} from './admin-home.component';
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';
import {AdminTotalOrderComponent} from './admin-total-order/admin-total-order.component';
import {AdminOrderDetailComponent} from './admin-orders/admin-order-detail/admin-order-detail.component';

const ADMIN_ROUTES: Routes = [
    {path: '', component: AdminHomeComponent},
    {path: 'comanda-general', component: AdminTotalOrderComponent},
    {path: 'comandes', component: AdminOrdersComponent},
    {path: 'comandes/:key', component: AdminOrderDetailComponent}
];

export const adminRouting = RouterModule.forChild( ADMIN_ROUTES );