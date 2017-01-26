import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AuthService} from '../../services-module/auth.service';

@Component( {
    selector: 'oms-reset-password',
    templateUrl: './reset-password.component.html'
} )
export class ResetPasswordComponent implements OnInit, OnDestroy {
    private resetPasswordForm: FormGroup;
    private errorMessage: string;
    private showError: boolean = false;
    private email: string;
    private mode: string;
    private oobCode: string;
    private resetPasswordSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.resetPasswordSubscription = this.route.queryParams
            .subscribe(
                (params) => {
                    this.mode = params['mode'];
                    this.oobCode = params['oobCode'];
                }
            );

        this.resetPasswordForm = this.fb.group( {
            password: ['',
                Validators.compose( [
                    Validators.required,
                    Validators.minLength( 8 )
                ] )]
        } );

        this.authService.verifyOnReset( this.oobCode )
            .then( (email) => this.email = email )
            .catch( (error) => console.error( error ) );
    }

    ngOnDestroy() {
        this.resetPasswordSubscription.unsubscribe();
    }

    private onResetFormSubmit = () => {
        this.authService
            .confirmPasswordReset(
                this.oobCode,
                this.resetPasswordForm.value.password
            )
            .then( () => {
                this.router.navigate( ['login'], {
                    queryParams: {'t': 'pswok'}
                } );
            } )
            .catch( (error) => console.error( error ) );
    };
}
