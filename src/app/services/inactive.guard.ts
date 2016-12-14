import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';

@Injectable()
export class InactiveGuard implements CanActivate {

    constructor(private configService: ConfigService) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.configService.getActive().first();
    }
}
