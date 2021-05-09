import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guide } from '../../_models/guide';

@Injectable({
  providedIn: 'root'
})
export class GuideService {
  baseUrl='http://localhost:5000/api/guide/';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<Guide[]>{
    return this.http.get<Guide[]>(this.baseUrl);
  }
  
  getById(id: number): Observable<Guide>{
    return this.http.get<Guide>(this.baseUrl + id);
  }

}
