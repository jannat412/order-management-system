import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export class ActiveUserGuard implements CanActivate, CanActivateChild {

    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {

        return this.userService.getUserActive()
            .map((active) => !!active.$value)
            .do(isActive => {
                if (!isActive) this.router.navigate(['login']);
            });

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate( route, state );
    }
}
