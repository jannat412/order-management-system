import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {LoginComponent} from './auth-module/login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './services-module/auth.guard';
import {InactiveGuard} from './services-module/inactive.guard';
import {AdminGuard} from './services-module/admin.guard';
import {ResetPasswordComponent} from './auth-module/resetPassword/reset-password.component';
import {ForgotPasswordComponent} from './auth-module/forgotPassword/forgot-password.component';
import {RootComponent} from './root/root.component';
import {ActiveUserGuard} from './services-module/active-user.guard';

const APP_ROUTES: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'reset-pass', component: ResetPasswordComponent},
    {path: 'forgot-pass', component: ForgotPasswordComponent},
    {path: '', component: RootComponent,
        children: [
            {path: '', redirectTo: 'inici', pathMatch: 'full'},
            {path: 'inici', component: HomeComponent, canActivate: [AuthGuard, ActiveUserGuard]},
            {path: 'comanda', canActivateChild: [AuthGuard, InactiveGuard, ActiveUserGuard], loadChildren: 'app/order-module/order.module'},
            {path: 'admin', canActivateChild: [AuthGuard, AdminGuard, ActiveUserGuard], loadChildren: 'app/admin-module/admin.module'},
            {path: 'soci', canActivateChild: [AuthGuard, ActiveUserGuard], loadChildren: 'app/user-module/user.module'}
        ]},
    {path: '**', redirectTo: '/', pathMatch: 'full'}
];

export const mainRouting = RouterModule.forRoot( APP_ROUTES, {
    preloadingStrategy: PreloadAllModules
} );
