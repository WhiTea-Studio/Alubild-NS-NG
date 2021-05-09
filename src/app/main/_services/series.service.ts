import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Series } from '../../_models/series';

@Injectable({
  providedIn: 'root'
})
export class SeriesService {
  baseUrl='http://localhost:5000/api/series/';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Series[]>{
    return this.http.get<Series[]>(this.baseUrl);
  }
  
  getById(id: number): Observable<Series>{
    return this.http.get<Series>(this.baseUrl + id);
  }

  getByManufacturer(manufacturerId: number): Observable<Series[]>{
    return this.http.get<Series[]>(this.baseUrl + 'manufacturer/' + manufacturerId);
  }
}
