import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {FirebaseAuthState, FirebaseAuth} from 'angularfire2';

import {AuthService} from '../../services/auth.service';
import {ValidationUtils} from '../../../utils/validation.utils';

@Component( {
    selector: 'oms-login',
    templateUrl: './login.component.html'
} )
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string;
    showError: boolean = false;
    showForm: boolean = false;

    constructor(private fb: FormBuilder,
                private firebaseAuth: FirebaseAuth,
                private authService: AuthService,
                private router: Router) {
    }

    onLoginFormSubmit() {
        this.authService.loginUser( this.loginForm.value )
            .subscribe(
                (data) => {
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
        // if user logged prevent on first loading
        // to show the home page
        this.firebaseAuth
            .map((authState: FirebaseAuthState) => !!authState)
            .subscribe(authenticated => {
                if (authenticated) {
                    this.router.navigate(['inici']);
                } else {
                    this.showForm = true;
                }
            });

        this.loginForm = this.fb.group( {
            email: ['', Validators.compose( [Validators.required, Validators.pattern( ValidationUtils.emailRegex )] )],
            password: ['', Validators.required]
        } )

    }
}
