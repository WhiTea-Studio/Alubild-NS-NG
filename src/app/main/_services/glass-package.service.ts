import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlassPackage } from '../../_models/glass-package';

@Injectable({
  providedIn: 'root'
})
export class GlassPackageService {
  baseUrl='http://localhost:5000/api/glass/';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<GlassPackage[]>{
    return this.http.get<GlassPackage[]>(this.baseUrl);
  }
  
  getById(id: number): Observable<GlassPackage>{
    return this.http.get<GlassPackage>(this.baseUrl + id);
  }

}
