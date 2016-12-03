import {Routes, RouterModule} from '@angular/router';

import {ProductDetailComponent} from './order-module/product-detail/product-detail.component';
import {ProductsListComponent} from './order-module/products-list/products-list.component';
import {ResumeComponent} from './order-module/resume/resume.component';
import {LoginComponent} from './auth-module/login/login.component';
import {AuthGuard} from './services/auth.guard';
import {InactiveGuard} from './services/inactive.guard';
import {HomeComponent} from './home/home.component';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'comanda', component: ProductsListComponent, canActivate: [AuthGuard, InactiveGuard]},
    {path: 'comanda/resum', component: ResumeComponent, canActivate: [AuthGuard, InactiveGuard]},
    {path: 'admin', loadChildren: 'app/admin-module/admin.module#AdminModule'},
    {path: 'producte/:key', component: ProductDetailComponent, canActivate: [AuthGuard, InactiveGuard]},
    {path: 'desactivat', component: ProductDetailComponent},
    {path: '**', redirectTo: '/login'}
];

export const routing = RouterModule.forRoot( APP_ROUTES );
