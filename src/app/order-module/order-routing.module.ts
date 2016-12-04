import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from '../services/auth.guard';
import {InactiveGuard} from '../services/inactive.guard';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ResumeComponent} from './resume/resume.component';

const ORDER_ROUTES: Routes = [
    {path: '', component: ProductsListComponent, canActivate: [AuthGuard, InactiveGuard]},
    {path: 'producte/:key', component: ProductDetailComponent, canActivate: [AuthGuard, InactiveGuard]},
    {path: 'resum', component: ResumeComponent, canActivate: [AuthGuard, InactiveGuard]},

];

export const orderRouting = RouterModule.forChild( ORDER_ROUTES );
