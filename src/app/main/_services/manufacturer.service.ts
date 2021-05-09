import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Manufacturer} from '../../_models/manufacturer';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  baseUrl='http://localhost:5000/api/manufacturer/';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(this.baseUrl);
  }
  
  getById(id: number): Observable<Manufacturer>{
    return this.http.get<Manufacturer>(this.baseUrl + id);
  }
  
  getByCategory(categoryId: number): Observable<Manufacturer[]>{
    return this.http.get<Manufacturer[]>(this.baseUrl + 'category/' + categoryId);
  }

}
