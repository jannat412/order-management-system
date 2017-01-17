import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {ValidationUtils} from '../../../../utils/utils';
import {AuthService} from '../../../services-module/auth.service';
import {Location} from '@angular/common';

@Component({
  selector: 'oms-admin-user-add',
  templateUrl: './admin-user-add.component.html'
})
export class AdminUserAddComponent implements OnInit {
  registerForm: FormGroup;
  errorMessage: string;
  showError: boolean = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private location: Location) { }

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
    this.authService.createUser(this.registerForm.value);
  };

}
