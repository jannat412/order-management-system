import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';

@Injectable()
export class InactiveGuard implements CanActivate, CanActivateChild {

    result: boolean = false;

    constructor(private configService: ConfigService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
        console.log('inactive', state);
        return this.configService.getActive()
            .take(1)
            .do(active => {
                if (!active) this.router.navigate(['inici']);
            });

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.canActivate( route, state );
    }
}
