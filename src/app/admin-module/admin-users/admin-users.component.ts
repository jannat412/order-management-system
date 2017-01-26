import {Component, OnInit, OnDestroy} from '@angular/core';
import {IUser} from '../../models/user';
import {Subscription} from 'rxjs/Subscription';
import {UserService} from '../../services-module/user.service';

@Component( {
    selector: 'oms-admin-users',
    templateUrl: './admin-users.component.html'
} )
export class AdminUsersComponent implements OnInit, OnDestroy {
    private users: IUser[] = [];
    private usersSubscription: Subscription;

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.usersSubscription = this.userService.getUsersData()
            .subscribe( (users) => this.users = users );
    }

    ngOnDestroy() {
        this.usersSubscription.unsubscribe();
    }

    private userActiveChange = (event: boolean, userKey: string) => {
        this.userService.setUserActive(event, userKey);
    }

}
