import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    result: boolean = false;

    constructor(private authService: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
        this.authService.isUserLogged()
            .subscribe( result => {
                this.result = result;
                if (!this.result) {
                    this.router.navigate( ['/home'] );
                }
            } );
        return this.result;
    }
}
