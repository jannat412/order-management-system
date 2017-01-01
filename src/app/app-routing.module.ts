import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LoginComponent} from './auth-module/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './services/auth.guard';
import {InactiveGuard} from './services/inactive.guard';
import {AdminGuard} from './services/admin.guard';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/inici', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'inici', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'comanda', canActivateChild: [AuthGuard, InactiveGuard], loadChildren: 'app/order-module/order.module#OrderModule'},
    {path: 'admin', canActivateChild: [AuthGuard, AdminGuard], loadChildren: 'app/admin-module/admin.module#AdminModule'},
    {path: '**', redirectTo: '/inici'}
];

export const mainRouting = RouterModule.forRoot( APP_ROUTES, {
    preloadingStrategy: PreloadAllModules
} );
