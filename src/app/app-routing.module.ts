import {Routes, RouterModule} from '@angular/router';

import {ProductDetailComponent} from './products/product-detail/product-detail.component';
import {ProductsListComponent} from './products/products-list/products-list.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './services/auth.guard';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'comanda', component: ProductsListComponent, canActivate: [AuthGuard]},
    {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'},
    {path: 'producte/:key', component: ProductDetailComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: '/login'}
];

export const routing = RouterModule.forRoot( APP_ROUTES );
