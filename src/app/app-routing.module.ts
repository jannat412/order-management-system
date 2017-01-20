import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LoginComponent} from './auth-module/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './services-module/auth.guard';
import {InactiveGuard} from './services-module/inactive.guard';
import {AdminGuard} from './services-module/admin.guard';
import {RegisterComponent} from './auth-module/register/register.component';
import {ResetPasswordComponent} from './auth-module/resetPassword/reset-password.component';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/inici', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'registre', component: RegisterComponent},
    {path: 'reset-pass', component: ResetPasswordComponent},
    {path: 'inici', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'comanda', canActivateChild: [AuthGuard, InactiveGuard], loadChildren: 'app/order-module/order.module'},
    {path: 'admin', canActivateChild: [AuthGuard, AdminGuard], loadChildren: 'app/admin-module/admin.module'},
    {path: '**', redirectTo: '/inici', pathMatch: 'full'}
];

export const mainRouting = RouterModule.forRoot( APP_ROUTES, {
    preloadingStrategy: PreloadAllModules
} );
