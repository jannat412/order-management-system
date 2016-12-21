import {Routes, RouterModule} from '@angular/router';
import {AdminHomeComponent} from './admin-home.component';
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';

const ADMIN_ROUTES: Routes = [
    {path: '', component: AdminHomeComponent},
    {path: 'comandes', component: AdminOrdersComponent},
];

export const adminRouting = RouterModule.forChild( ADMIN_ROUTES );