import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component( {
    selector: 'oms-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.scss']
} )
export class HeaderComponent implements OnInit {

    authInfo: boolean = false;
    admin: boolean = false;

    constructor(private authService: AuthService,
                private userService: UserService,
                private router: Router) {
    }

    isAuth = () => this.authInfo;
    isAdmin = () => this.admin;

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

    }

}
