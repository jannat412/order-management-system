import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../services-module/auth.service';
import {UserService} from '../services-module/user.service';
import {ConfigService} from '../services-module/config.service';
import {IUser} from '../models/user';

@Component( {
    selector: 'oms-header',
    templateUrl: './header.component.html'
} )
export class HeaderComponent implements OnInit, OnDestroy {

    configSubscription: Subscription;
    adminSubscription: Subscription;
    userSubscription: Subscription;
    authSubscription: Subscription;
    authInfo: boolean = false;
    admin: boolean = false;
    active: boolean = false;
    user: IUser;

    constructor(private authService: AuthService,
                private userService: UserService,
                private configService: ConfigService,
                private router: Router) {
    }

    logout = () => {

        this.authService.logoutUser();
        this.router.navigate( [ 'login' ] );
    };

    ngOnInit() {

        this.authSubscription = this.authService.getUserId()
            .subscribe( authenticated => {
                this.authInfo = authenticated;

                if (!this.authInfo) {
                    return;
                } else {
                    this.configSubscription = this.configService.getActive()
                        .subscribe(
                            (data: boolean) => this.active = data
                        );
                    this.adminSubscription = this.userService.isUserAdmin()
                        .subscribe(
                            (admin: boolean) => this.admin = admin
                        );
                    this.userSubscription = this.authService.getUserId()
                        .flatMap(
                            (uid) => this.userService.getUserData( uid )
                        )
                        .subscribe(
                            (user: IUser) => this.user = user
                        );
                }
            } );


    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
        if (this.configSubscription) this.configSubscription.unsubscribe();
        if (this.adminSubscription) this.adminSubscription.unsubscribe();
        if (this.userSubscription) this.userSubscription.unsubscribe();
    }

}
