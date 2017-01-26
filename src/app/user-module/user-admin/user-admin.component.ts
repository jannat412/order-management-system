import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services-module/auth.service';
import {ValidationUtils} from '../../utils/utils';
import {UserService} from '../../services-module/user.service';
import {IUser} from '../../models/user';

@Component( {
    selector: 'oms-user-admin',
    templateUrl: './user-admin.component.html',
    styleUrls: [ './user-admin.component.scss' ]
} )
export class UserAdminComponent implements OnInit {

    private userForm: FormGroup;
    private user: IUser;
    private errorMessage: string;
    private showError: boolean = false;
    private error: Error;

    constructor(private fb: FormBuilder,
                private authService: AuthService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.userForm = this.fb.group( {
            email: [ '',
                Validators.compose( [
                    Validators.required,
                    Validators.pattern( ValidationUtils.email )
                ] ) ],
            name: [ '',
                Validators.compose( [
                    Validators.required,
                    Validators.minLength( 2 )
                ] ) ],
            secondName: [ '',
                Validators.compose( [
                    Validators.required,
                    Validators.minLength( 2 )
                ] ) ],
            address: [ '' ],
            cp: [ '',
                Validators.pattern( ValidationUtils.cp )
            ],
            city: [ '' ],
            tel: [ '',
                Validators.pattern( ValidationUtils.phone )
            ]
        } );

        this.authService.getUserId()
            .flatMap( uid => this.userService.getUserData( uid ) )
            .subscribe( user => {
                this.user = user;
                this.userForm.patchValue( user );
            } );

    }

    onUserFormSubmit = () => {
        let userData = this.userForm.value;

        // update user

    };

}
