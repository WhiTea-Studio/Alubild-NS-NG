import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypologyModel } from '../../_models/typology-model';

@Injectable({
  providedIn: 'root'
})
export class TypologyModelService {
  baseUrl='http://localhost:5000/api/typologymodel/';

  constructor(private http: HttpClient) { }
  
  getAll(typologyId?: number, categoryId?: number): Observable<TypologyModel[]>{
    let params = new HttpParams();
    
    if(typologyId){
      params = params.append('typologyId', typologyId?.toString());
    }

    if(categoryId){
      params = params.append('categoryId', categoryId?.toString());
    }
    
    return this.http.get<TypologyModel[]>(this.baseUrl, {params});
  }
  
  getById(id: number, typologyId: number): Observable<TypologyModel>{
    return this.http.get<TypologyModel>(this.baseUrl + id + '/typology/' + typologyId);
  }

}
