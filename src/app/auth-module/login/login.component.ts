import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FirebaseAuthState, FirebaseAuth} from 'angularfire2';

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
                    this.router.navigate( ['/home'] );
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
            .take(1)
            .map((authState: FirebaseAuthState) => !!authState)
            .subscribe(authenticated => {
                if (authenticated) {
                    this.router.navigate(['/home']);
                } else {
                    this.showForm = true;
                }
            });

        let emailRegex = `([a-zA-Z0-9_.]{1}[a-zA-Z0-9_.]*)((@[a-zA-Z]{2}[a-zA-Z]*)[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))`;
        this.loginForm = this.fb.group( {
            email: ['', Validators.compose( [Validators.required, Validators.pattern( emailRegex )] )],
            password: ['', Validators.required]
        } )

    }
}
