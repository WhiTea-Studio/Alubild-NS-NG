import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, throwError } from 'rxjs';
import { RouterExtensions } from '@nativescript/angular';

import { Order } from '../_models/order';
import { getString } from '@nativescript/core/application-settings';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
    baseUrl ='http://localhost:5000/api/order/';
    pageNumber = 1;
    pageSize = 10;

    constructor(private http: HttpClient,
        private router: RouterExtensions) { }

     getAll(page?, itemsPerPage?): Observable<Order[]>{

        let par = new HttpParams();

        if (page != null && itemsPerPage != null){
            par = par.append('pageNumber', page);
            par = par.append('pageSize', itemsPerPage);
        }


        return this.http.get<Order[]>(this.baseUrl + 'user/' + JSON.parse(getString('user')).id, { params: par});
    }

    get(id: any): Observable<Order>{
        return this.http.get<Order>(this.baseUrl + id);
    };

    delete(id: any): Observable<any>{
        return this.http.delete<any>(this.baseUrl + id);
    }

    insert(order: Order): Observable<Order>{
        return this.http.post<Order>(this.baseUrl, order);
    }

    edit(order: Order): Observable<Order>{
        return this.http.put<Order>(this.baseUrl + order.id, order);
    }
}
