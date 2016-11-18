import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ConfigService} from '../services/config.service';

@Component( {
    selector: 'oms-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.scss']
} )
export class HeaderComponent implements OnInit {

    authInfo: boolean = false;
    admin: boolean = false;
    active: boolean = false;

    constructor(private authService: AuthService,
                private userService: UserService,
                private configService: ConfigService,
                private router: Router) {
    }

    isAuth = () => this.authInfo;
    isAdmin = () => this.admin;
    isActive = () => this.active;

    logout = () => {
        this.authService.logoutUser();
        this.router.navigate( ['/login'] );
    };

    ngOnInit() {
        this.authService.isUserLogged()
            .subscribe( authStatus => {
                this.authInfo = authStatus;
                if (!this.isAuth()) {
                    this.router.navigate( ['/login'] );
                }
            } );

        this.userService.isUserAdmin()
            .subscribe( (admin: boolean) => {
                this.admin = admin;
            } );

        this.configService.getActive()
            .subscribe(
                (data) => this.active = data
            );

    }

}
