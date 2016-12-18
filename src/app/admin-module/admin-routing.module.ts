import {Routes, RouterModule} from '@angular/router';
import {AdminHomeComponent} from './admin-home.component';

const ADMIN_ROUTES: Routes = [
    {path: '', component: AdminHomeComponent}
];

export const adminRouting = RouterModule.forChild( ADMIN_ROUTES );