import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Category} from '../../_models/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
baseUrl='http://localhost:5000/api/category/';

constructor(private http: HttpClient) { }

getAll(): Observable<Category[]>{
  return this.http.get<Category[]>(this.baseUrl);
}

getById(id: number): Observable<Category>{
  return this.http.get<Category>(this.baseUrl + id);
}

getByTypology(typologyId: number): Observable<Category[]>{
  return this.http.get<Category[]>(this.baseUrl + 'typology/' + typologyId);
}
}
