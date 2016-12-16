import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth-module/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './services/auth.guard';
import {InactiveGuard} from './services/inactive.guard';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'comanda', canActivateChild: [AuthGuard, InactiveGuard], loadChildren: 'app/order-module/order.module#OrderModule'},
    {path: 'admin', canActivateChild: [AuthGuard], loadChildren: 'app/admin-module/admin.module#AdminModule'},
    {path: '**', redirectTo: '/home'}
];

export const mainRouting = RouterModule.forRoot( APP_ROUTES );
