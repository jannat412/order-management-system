import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {FirebaseAuth, FirebaseAuthState} from 'angularfire2';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private firebaseAuth: FirebaseAuth, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | boolean {

        return this.firebaseAuth
            .take(1)
            .map((authState: FirebaseAuthState) => !!authState)
            .do(authenticated => {
                if (!authenticated) this.router.navigate(['/login']);
            });

    }
}
