import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Color } from '../../_models/color';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  baseUrl='http://localhost:5000/api/color/';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Color[]>{
    return this.http.get<Color[]>(this.baseUrl);
  }
  
  getById(id: number): Observable<Color>{
    return this.http.get<Color>(this.baseUrl + id);
  }

  getByCategory(categoryId: number): Observable<Color[]>{
    return this.http.get<Color[]>(this.baseUrl + 'category/' + categoryId);
  }

}
