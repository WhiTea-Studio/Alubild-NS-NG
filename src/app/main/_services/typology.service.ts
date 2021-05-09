import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Typology} from '../../_models/typology';


@Injectable({
  providedIn: 'root'
})
export class TypologyService {
  baseUrl='http://localhost:5000/api/typology/';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Typology[]>{
    return this.http.get<Typology[]>(this.baseUrl);
  }
  
  getById(id: number): Observable<Typology>{
    return this.http.get<Typology>(this.baseUrl + id);
  }

}
