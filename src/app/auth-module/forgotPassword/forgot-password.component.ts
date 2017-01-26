import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services-module/auth.service';
import {ValidationUtils} from '../../utils/utils';

@Component( {
    selector: 'oms-forgot-password',
    templateUrl: './forgot-password.component.html'
} )
export class ForgotPasswordComponent implements OnInit {
    resetPasswordForm: FormGroup;
    errorMessage: string;
    showError: boolean = false;
    showOk: boolean = false;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.resetPasswordForm = this.fb.group( {
            email: ['',
                Validators.compose( [
                    Validators.required,
                    Validators.pattern( ValidationUtils.email )
                ] )],
        } )

    }

    onResetFormSubmit = () => {
        let self = this;
        this.authService
            .verifyRegistration( this.resetPasswordForm.value.email )
            .then(
                function (e) {
                    console.log( 'email sent', e );
                    self.showError = false;
                    self.showOk = true;
                }
            )
            .catch( (error) => {
                self.errorMessage = error.message;
                self.showError = true;
                self.showOk = false;
            });
    };
}
