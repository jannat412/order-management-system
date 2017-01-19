import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ValidationUtils} from '../../../../utils/utils';
import {AuthService} from '../../../services-module/auth.service';
import {Router} from '@angular/router';

@Component( {
    selector: 'oms-admin-user-add',
    templateUrl: './admin-user-add.component.html'
} )
export class AdminUserAddComponent implements OnInit {
    registerForm: FormGroup;
    errorMessage: string;
    showError: boolean = false;
    error: Error;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
        this.registerForm = this.fb.group( {
            email: ['',
                Validators.compose( [
                    Validators.required,
                    Validators.pattern( ValidationUtils.email )
                ] )],
            name: ['',
                Validators.compose( [
                    Validators.required,
                    Validators.minLength( 2 )
                ] )],
            secondName: ['',
                Validators.compose( [
                    Validators.required,
                    Validators.minLength( 2 )
                ] )]
        } )
    }

    onRegisterFormSubmit = () => {
        const userData = this.registerForm.value;

        // this.authService.createUser( userData.email )
        //     .then( (user) => {
        //         userData.role = 'soci';
        //         userData.active = false;
        //         this.authService.saveUserInfo( user.uid, userData )
        //             .then( () => {
        //                 this.authService.verifyRegistration( );
        //                 this.router.navigate( ['../admin/socis'] );
        //             } )
        //             .catch( (error) => {
        //                 this.error = error;
        //                 console.log( this.error );
        //             } );
        //
        //
        //     } )
        //     .catch( (error) => {
        //         this.error = error;
        //         console.log( this.error );
        //     } );

        this.authService.createTempUser( userData )
            .then(
                () => {
                    //this.authService.sendResetPassword(userData.email);
                    this.router.navigate( ['../admin/socis'] );
                },
                (err) => console.error( err )
            );
    };

}
