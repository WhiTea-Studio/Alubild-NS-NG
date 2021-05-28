import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Order } from '../_models/order';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class UserInfoResolver implements Resolve<User>{

    constructor(private authService: AuthService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User>{
        return this.authService.get().pipe(
            catchError(error => {
                console.log('Problem prilikom učitavanja podataka - RESOLVER BACIO');
                // this.router.navigate(['/']);
                return of(null);
            })
        )
    }
}
