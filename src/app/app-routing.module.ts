import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth-module/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './services/auth.guard';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'comanda', canActivate: [AuthGuard], loadChildren: 'app/order-module/order.module#OrderModule'},
    {path: 'admin', canActivate: [AuthGuard], loadChildren: 'app/admin-module/admin.module#AdminModule'},
    {path: '**', redirectTo: '/login'}
];

export const mainRouting = RouterModule.forRoot( APP_ROUTES );
