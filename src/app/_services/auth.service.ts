import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import {catchError, tap} from 'rxjs/operators';
import { BehaviorSubject, of, throwError,Observable } from 'rxjs';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { getString, hasKey, setString, remove } from '@nativescript/core/application-settings';
import { RouterExtensions } from '@nativescript/angular';
import jwt_decode from '../../../node_modules/jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    baseUrl ='http://localhost:5000/api/auth/';
    decodedToken: any;
    userRes: any;
    private _user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: number;

    constructor(private http: HttpClient,
        // private jwtHelper: JwtHelperService,
        private router: RouterExtensions) { }

    get user(){
        return this._user.asObservable();
    }

    get(): Observable<User>{
        return this.http.get<User>(this.baseUrl + JSON.parse(getString('user')).id);
    }

    register(userReg: User){

        console.log(userReg);
        return this.http.post<any>(this.baseUrl + 'register', userReg)
                .pipe(
                    catchError(errorResponse => {
                        console.log('Register => catch  error');
                        alert(errorResponse.error[0].description);
                        // alert(errorResponse);
                        return throwError(errorResponse);
                    }),
                    tap( (resData:any) => {
                        if(resData && resData.token){
                            // const user = new UserModel(resData.email,resData.id,resData.token, new Date());
                            // this.userRes = this.jwtHelper.decodeToken(resData.token);
                            this.userRes = jwt_decode(resData.token);
                            // console.log(this.userRes);
                            this.userRes = resData.user;
                            setString('token', resData.token);
                            setString('user',JSON.stringify(resData.user));
                            this.autoLogout(this.timeToExpiery(getString('token')));
                            // this._user.next(this.userRes);
                        }
                }));
    }

    login(model){
        return this.http.post(this.baseUrl + 'login', model)
        .pipe(
            catchError(errorResponse => {
                alert(errorResponse.error);
                console.log('Login => catch error');
                return throwError(errorResponse);
            }),
            tap( (resData:any) => {
                if(resData && resData.token){
                    this.userRes = jwt_decode(resData.token);
                    this.userRes = resData.user;
                    // this._user.next(this.userRes.user);
                    setString('token', resData.token);
                    setString('user',JSON.stringify(resData.user));
                    // this.autoLogout(this.timeToExpiery(getString('token')));
                    // console.log(getString('token'));
                } else{
                    console.log('greska u if auth login');
                }
            })
        );
    }

    logout(){
        // this._user.next(null);
        remove('user');
        remove('token');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.router.navigate(['/'], {clearHistory:true});
    }

    autoLogin(){
        if( !hasKey('user') ){
            return of(false);
        }
        var token: string = getString('token');
        const userData = JSON.parse(getString('user'));
        if(this.isAuth(token)){
            this._user.next(userData);
            this.autoLogout(this.timeToExpiery(getString('token')));
            return of(true);
        }
        return of(false);
    }

    autoLogout(expirationDuration: number) {
        setTimeout(()=>{
            this.logout();
        }, expirationDuration);
    }

    isAuth(token: string){
        return !!token; //false ako je null, true ako nije
    }

    token(token: string){
        if(!token){
            return null;
        }
        return token;
    }

    isExpiredToken(token: string){
        this.decodedToken = jwt_decode(token);
        let expireDate = this.decodedToken.exp; // get token expiration dateTime
        var current_time = Date.now() / 1000;
        console.log(current_time);
        if ( expireDate < current_time) {
            console.log('istekao');
            return false;
        }
        console.log('nije istekao');
        return true;
    }

    timeToExpiery(token: string){
        this.decodedToken = jwt_decode(token);
        let expireDate = this.decodedToken.exp; // get token expiration dateTime
        var current_time = Date.now() / 1000;
        console.log(expireDate - current_time);
        return expireDate - current_time;
    }
}
