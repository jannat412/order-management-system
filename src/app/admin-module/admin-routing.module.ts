import {Routes, RouterModule} from '@angular/router';
import {AdminHomeComponent} from './admin-home.component';
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';
import {AdminTotalOrderComponent} from './admin-total-order/admin-total-order.component';
import {AdminOrderDetailComponent} from './admin-orders/admin-order-detail/admin-order-detail.component';
import {AdminUsersComponent} from './admin-users/admin-users.component';
import {AdminUserAddComponent} from './admin-users/admin-user-add/admin-user-add.component';

const ADMIN_ROUTES: Routes = [
    {path: '', component: AdminHomeComponent},
    {path: 'comanda-general', component: AdminTotalOrderComponent},
    {path: 'comandes', component: AdminOrdersComponent},
    {path: 'comandes/:key', component: AdminOrderDetailComponent},
    {path: 'socis', component: AdminUsersComponent},
    {path: 'socis/nou', component: AdminUserAddComponent}
];

export const ADMIN_ROUTING = RouterModule.forChild( ADMIN_ROUTES );