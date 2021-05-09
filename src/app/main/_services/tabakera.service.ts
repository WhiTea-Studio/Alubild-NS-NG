import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tabakera } from '../../_models/tabakera';

@Injectable({
  providedIn: 'root'
})
export class TabakeraService {
  baseUrl='http://localhost:5000/api/tabakera/';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Tabakera[]>{
    return this.http.get<Tabakera[]>(this.baseUrl);
  }
  
  getById(id: number): Observable<Tabakera>{
    return this.http.get<Tabakera>(this.baseUrl + id);
  }

}
