import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth-module/login/login.component';
import {HomeComponent} from './home/home.component';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'comanda', loadChildren: 'app/order-module/order.module#OrderModule'},
    {path: 'admin', loadChildren: 'app/admin-module/admin.module#AdminModule'},
    {path: '**', redirectTo: '/login'}
];

export const routing = RouterModule.forRoot( APP_ROUTES );
