import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

import {FirebaseAuthState} from 'angularfire2';

import {AuthService} from '../../services-module/auth.service';
import {ValidationUtils} from '../../../utils/utils';

@Component( {
    selector: 'oms-login',
    templateUrl: './login.component.html'
} )
export class LoginComponent implements OnInit, OnDestroy {
    loginForm: FormGroup;
    errorMessage: string;
    showError: boolean = false;
    showForm: boolean = false;
    resetOk: boolean = false;
    routeSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute) {
    }

    onLoginFormSubmit() {
        this.authService.loginUser( this.loginForm.value )
            .subscribe(
                () => {
                    this.errorMessage = '';
                    this.showError = false;
                    this.router.navigate( ['inici'] );
                },
                (error) => {
                    this.errorMessage = error;
                    this.showError = true;
                } );
    }

    ngOnInit() {
        this.routeSubscription = this.route.queryParams
            .subscribe(
                (params) => {
                    if(params['t'] && params['t'] === 'pswok') {
                        this.resetOk = true;
                    }
                }
            );
        // if user logged prevent on first loading
        // to show the home page
        this.authService.getUserId()
            .map( (authState: FirebaseAuthState) => !!authState )
            .subscribe( authenticated => {
                if (authenticated) {
                    this.router.navigate( ['inici'] );
                } else {
                    this.showForm = true;
                }
            } );

        this.loginForm = this.fb.group( {
            email: ['',
                Validators.compose( [
                    Validators.required,
                    Validators.pattern( ValidationUtils.email )
                ] )],
            password: ['',
                Validators.compose( [
                    Validators.required,
                    Validators.minLength( 8 )
                ] )]
        } )

    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }
}
