import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {Subscription} from 'rxjs';

@Component( {
    selector: 'oms-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.scss']
} )
export class HeaderComponent implements OnInit{

    authInfo: boolean = false;
    admin: boolean = false;
    private subscription: Subscription;

    constructor(private authService: AuthService,
                private userService: UserService,
                private router: Router) {
    }

    isAuth = () => this.authInfo;
    isAdmin = () => this.admin;

    checkAdmin = () => {
        this.subscription = this.userService.getUserRole()
            .subscribe( (role: string) => {
                if (role) {
                    this.admin = role === 'admin';
                } else {
                    this.admin = false;
                }
            } );
    };

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
                } else {
                    this.checkAdmin();
                }
            } );

    }

}
