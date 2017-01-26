import {Routes, RouterModule} from '@angular/router';
import {ProductsListComponent} from './products-list/products-list.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ResumeComponent} from './resume/resume.component';

const ORDER_ROUTES: Routes = [
    {path: '', component: ProductsListComponent},
    {path: 'producte/:key', component: ProductDetailComponent},
    {path: 'resum', component: ResumeComponent},

];

export const ORDER_ROUTING = RouterModule.forChild( ORDER_ROUTES );
