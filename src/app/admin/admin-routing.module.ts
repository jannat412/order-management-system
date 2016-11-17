import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin.component';

const ADMIN_ROUTES: Routes = [
    {path: '', component: AdminComponent}
];

export const adminRouting = RouterModule.forChild( ADMIN_ROUTES );