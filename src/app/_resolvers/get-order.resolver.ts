import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Order } from '../_models/order';
import { OrderService } from '../_services/order.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OrderResolver implements Resolve<Order>{

    constructor(private orderService: OrderService){}

    resolve(route: ActivatedRouteSnapshot): Observable<Order>{
        return this.orderService.get(route.params['id']).pipe(
            catchError(error => {
                console.log('Problem prilikom učitavanja podataka - RESOLVER BACIO');
                // this.router.navigate(['/']);
                return of(null);
            })
        )
    }
}
