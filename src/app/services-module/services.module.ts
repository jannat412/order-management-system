import {NgModule} from '@angular/core';
import {AuthService} from './auth.service';
import {UserService} from './user.service';
import {ConfigService} from './config.service';
import {OrderService} from './order.service';
import {InactiveGuard} from './inactive.guard';
import {AuthGuard} from './auth.guard';
import {AdminGuard} from './admin.guard';
import {ProductsService} from './products.service';
import {CategoriesService} from './categories.service';
import {TagsService} from './tags.service';
import {AdminTypeService} from './admin-type.service';
import {AdminOrderService} from './admin-order.service';
import {AdminUserService} from './admin-user.service';
import {ActiveUserGuard} from './active-user.guard';
import {ResumeDataService} from './resume-data.service';

@NgModule({})

export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [
                AuthService,
                UserService,
                ConfigService,
                OrderService,
                InactiveGuard,
                AuthGuard,
                AdminGuard,
                ActiveUserGuard
            ]
        }
    };

    static forOrder() {
        return {
            ngModule: ServicesModule,
            providers: [
                ProductsService,
                CategoriesService,
                TagsService,
                ResumeDataService
            ]
        }
    }

    static forAdmin() {
        return {
            ngModule: ServicesModule,
            providers: [
                AdminTypeService,
                AdminOrderService,
                UserService,
                ProductsService,
                CategoriesService,
                AdminUserService,
                ResumeDataService
            ]
        }
    }

    static forAuth() {
        return {
            ngModule: ServicesModule,
            providers: [
                AuthService
            ]
        }
    }
}