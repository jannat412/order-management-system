import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {UserService} from './user.service';

@Injectable()
export class AdminGuard implements CanActivate, CanActivateChild {

    result: boolean = false;

    constructor(private userService: UserService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {

        return this.userService.isUserAdmin()
            .take( 1 )
            .do( admin => {
                if (!admin) this.router.navigate( ['/home'] );
            } );

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate( route, state );
    }
}
