import {Routes, RouterModule} from '@angular/router';

import {ProductDetailComponent} from './order/product-detail/product-detail.component';
import {ProductsListComponent} from './order/products-list/products-list.component';
import {LoginComponent} from './auth/login/login.component';
import {AuthGuard} from './services/auth.guard';
import {InactiveGuard} from './services/inactive.guard';
import {HomeComponent} from './home/home.component';
import {ResumeComponent} from './order/resume/resume.component';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'comanda', component: ProductsListComponent, canActivate: [AuthGuard, InactiveGuard]},
    {path: 'comanda/resum', component: ResumeComponent, canActivate: [AuthGuard, InactiveGuard]},
    {path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule'},
    {path: 'producte/:key', component: ProductDetailComponent, canActivate: [AuthGuard, InactiveGuard]},
    {path: 'desactivat', component: ProductDetailComponent},
    {path: '**', redirectTo: '/login'}
];

export const routing = RouterModule.forRoot( APP_ROUTES );
