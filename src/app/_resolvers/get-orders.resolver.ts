import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Order } from '../_models/order';
import { OrderService } from '../_services/order.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OrdersResolver implements Resolve<Order[]>{
    pageNumber = 1;
    pageSize = 10;

    constructor(private orderService: OrderService,
                private router: Router){}

    resolve(): Observable<Order[]>{
        return this.orderService.getAll().pipe(
            catchError(error => {
                console.log('Problem prilikom učitavanja podataka - RESOLVER BACIO');
                // this.router.navigate(['/']);
                return of(null);
            })
        )
    }
}
