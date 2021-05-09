import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quality } from '../../_models/quality';

@Injectable({
  providedIn: 'root'
})
export class QualityService {
  baseUrl='http://localhost:5000/api/quality/';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Quality[]>{
    return this.http.get<Quality[]>(this.baseUrl);
  }
  
  getById(id: number): Observable<Quality>{
    return this.http.get<Quality>(this.baseUrl + id);
  }

  getByCategory(categoryId: number): Observable<Quality[]>{
    return this.http.get<Quality[]>(this.baseUrl + 'category/' + categoryId);
  }

}
