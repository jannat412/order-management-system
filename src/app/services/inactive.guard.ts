import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';

@Injectable()
export class InactiveGuard implements CanActivate {

    result: boolean = false;

    constructor(private configService: ConfigService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
        this.configService.getActive()
            .subscribe( result => {
                this.result = result;
                if (!this.result) {
                    this.router.navigate( ['/home'] );
                }
            } );
        return this.result;
    }
}
