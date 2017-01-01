import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {ConfigService} from '../services/config.service';
import {Subscription} from 'rxjs/Subscription';
import {FirebaseAuth, FirebaseAuthState} from 'angularfire2';

@Component( {
    selector: 'oms-header',
    templateUrl: './header.component.html'
} )
export class HeaderComponent implements OnInit, OnDestroy {

    configSubscription: Subscription;
    adminSubscription: Subscription;
    authInfo: boolean = false;
    admin: boolean = false;
    active: boolean = false;

    constructor(private authService: AuthService,
                private firebaseAuth: FirebaseAuth,
                private userService: UserService,
                private configService: ConfigService,
                private router: Router) {
    }

    logout = () => {
        this.configSubscription.unsubscribe();
        this.adminSubscription.unsubscribe();
        this.authService.logoutUser();
        this.router.navigate( ['login'] );
    };

    ngOnInit() {

        this.firebaseAuth
            .map((authState: FirebaseAuthState) => !!authState)
            .subscribe(authenticated => {
                this.authInfo = authenticated;

                if (!this.authInfo) {
                    this.router.navigate( ['login'] );

                } else {
                    this.configSubscription = this.configService.getActive()
                        .subscribe(
                            (data) => this.active = data
                        );

                    this.adminSubscription = this.userService.isUserAdmin()
                        .subscribe( (admin: boolean) => {
                            this.admin = admin;
                        } );

                }
            } );
    }

    ngOnDestroy() {
        this.configSubscription.unsubscribe();
        this.adminSubscription.unsubscribe();
    }

}
