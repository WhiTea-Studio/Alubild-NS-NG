import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../../_models/category';
import { CategoryService } from '../_services/category.service';

@Injectable()
export class CategoriesAllResolver implements Resolve<Category[]>{
    constructor( private service: CategoryService, private router: Router){}

    resolve(): Observable<Category[]>{
        return this.service.getAll().pipe(
            catchError(error => {
                alert('Problem prilikom učitavanja podataka');
                return of(null);
            })
        )
    }

}