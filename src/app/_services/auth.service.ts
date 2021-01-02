import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import {catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    baseUrl ='http://localhost:5000/api/auth/';
    decodedToken: any;
    constructor(private http: HttpClient) { }

    register(user: User){
        return this.http.post<User>(this.baseUrl + 'register', user)
                .pipe(catchError(errorResponse => {
                    alert(errorResponse.error[0].description);
                    return throwError(errorResponse);
                }));
    }

    login(model){
        return this.http.post(this.baseUrl + 'login', model)
        .pipe(catchError(errorResponse => {
            alert(errorResponse.error);
            return throwError(errorResponse);
        }));
    }
}
