import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services-module/auth.service';
import {ValidationUtils} from '../../utils/utils';
import {UserService} from '../../services-module/user.service';
import {IUser} from '../../models/user';
import {Subscription} from 'rxjs';

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
    private orderSaved: boolean = false;
    private updateSubscription: Subscription;

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

        this.updateSubscription = this.userService.updateOrderEmitter
            .subscribe( data => this.orderSaved = data.status || false );
    }

    onUserFormSubmit = () => {
        let userData = this.userForm.value;
        console.log( this.user );
        console.log( userData );
        this.userService.updateUserData( this.user[ '$key' ], userData )
            .then( () => {
                    console.log( 'done' );
                },
                (err) => console.error( err )
            );
    };

}
