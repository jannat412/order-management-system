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

    private configSubscription: Subscription;
    private adminSubscription: Subscription;
    private userSubscription: Subscription;
    private authSubscription: Subscription;
    private authInfo: boolean = false;
    private admin: boolean = false;
    private active: boolean = false;
    private user: IUser;

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
