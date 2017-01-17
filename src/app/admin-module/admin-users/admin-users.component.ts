import { Component, OnInit } from '@angular/core';
import {IUser} from '../../models/user';
import {Subscription} from 'rxjs';
import {UserService} from '../../services-module/user.service';
import {AuthService} from '../../services-module/auth.service';

@Component({
  selector: 'oms-admin-users',
  templateUrl: './admin-users.component.html'
})
export class AdminUsersComponent implements OnInit {
  private users: IUser[] = [];
  private usersSubscription: Subscription;

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.usersSubscription = this.userService.getUsersData()
        .subscribe((users) => this.users = users);
  }

}
