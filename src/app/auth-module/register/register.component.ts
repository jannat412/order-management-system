import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {FirebaseAuthState} from 'angularfire2';

import {AuthService} from '../../services-module/auth.service';
import {ValidationUtils} from '../../../utils/utils';

@Component( {
    selector: 'oms-register',
    templateUrl: './register.component.html'
} )
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    errorMessage: string;
    showError: boolean = false;

    constructor(private fb: FormBuilder,
                private authService: AuthService) {
    }

    onRegisterFormSubmit() {
        this.authService.createUser( this.registerForm.value )
            .then(
                (data) => {
                    this.errorMessage = '';
                    this.showError = false;
                    console.log('subscribed', data);
                    //this.router.navigate( ['inici'] );
                },
                (error) => {
                    this.errorMessage = error.message;
                    this.showError = true;
                } );
    }

    ngOnInit() {

        this.registerForm = this.fb.group( {
            email: ['',
                Validators.compose( [
                    Validators.required,
                    Validators.pattern( ValidationUtils.email )
                ] )],
            password: ['',
                Validators.compose( [
                    Validators.required,
                    Validators.minLength( 6 )
                ] )]
        } )

    }
}
