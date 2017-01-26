import {Routes, RouterModule} from '@angular/router';
import {UserAdminComponent} from './user-admin/user-admin.component';

const USER_ROUTES: Routes = [
    {path: '', component: UserAdminComponent}
];

export const USER_ROUTING = RouterModule.forChild( USER_ROUTES );
