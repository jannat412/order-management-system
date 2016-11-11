import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component( {
    selector: 'oms-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.scss']
} )
export class HeaderComponent implements OnInit {

    authInfo: boolean = false;

    constructor(private authService: AuthService,
                private router: Router) {
    }

    isAuth() {
        return this.authInfo;
    }

    logout() {
        this.authService.logoutUser();
        this.router.navigate( ['/login'] );
    }

    ngOnInit() {
        this.authService.isUserLogged()
            .subscribe( authStatus => {
                this.authInfo = authStatus;

                if (!this.isAuth()) {
                    this.router.navigate( ['/login'] );
                }
            } );
    }
}
