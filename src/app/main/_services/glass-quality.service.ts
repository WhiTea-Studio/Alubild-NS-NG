import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlassQuality } from '../../_models/glass-quality';

@Injectable({
  providedIn: 'root'
})
export class GlassQualityService {
  baseUrl='http://localhost:5000/api/glassquality/';

  constructor(private http: HttpClient) { }
  
  getAll(): Observable<GlassQuality[]>{
    return this.http.get<GlassQuality[]>(this.baseUrl);
  }
  
  getById(id: number): Observable<GlassQuality>{
    return this.http.get<GlassQuality>(this.baseUrl + id);
  }

}
