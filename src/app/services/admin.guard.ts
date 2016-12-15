import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export class AdminGuard implements CanActivate {

    result: boolean = false;

    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {

        this.userService.isUserAdmin()
            .subscribe( result => {
                this.result = result;
                if (!this.result) {
                    this.router.navigate( ['/home'] );
                }
            } );
        return this.result;
    }
}
