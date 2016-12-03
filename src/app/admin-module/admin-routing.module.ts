import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';
import {AdminGuard} from '../services/admin.guard';

const ADMIN_ROUTES: Routes = [
    {path: '', component: AdminComponent, canActivate: [AdminGuard]}
];

export const adminRouting = RouterModule.forChild( ADMIN_ROUTES );