import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ValidationUtils} from '../../../utils/utils';
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
                ] )],
            address: [''],
            cp: ['',
                Validators.compose( [
                    Validators.pattern( ValidationUtils.cp )
                ] )],
            city: ['']
        } )
    }

    onRegisterFormSubmit = () => {
        let userData = this.registerForm.value;

        this.authService.createUser( userData )
            .then( (user) => {
                    const UID = user.uid;
                    userData.role = 'soci';
                    userData.active = true;
                    this.authService.saveUserInfo( UID, userData )
                        .then(
                            () => {
                                this.router.navigate( ['../admin/socis'] )
                            },
                            (err) => console.error( err )
                        );
                },
                (err) => console.error( err )
            );

    };

}
