import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Product } from '../models/product';
import {Observable, shareReplay, throwError} from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // API path
  base_path = 'http://localhost:9191';

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*'
    })
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  // Create a new item
  createItem(item: any): Observable<Product> {
    return this.http
      .post<Product>(this.base_path+'/addProduct', JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get single student data by ID
  getItem(id: any): Observable<Product> {
    return this.http
      .get<Product>(this.base_path + '/product/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Get students data
  getList(): Observable<Product> {
    return this.http
      .get<Product>(this.base_path+'/products')
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Update item by id
  updateItem(id: any, item: any): Observable<Product> {
    return this.http
      .put<Product>(this.base_path + '/update/' + id, JSON.stringify(item), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // Delete item by id
  deleteItem(id: any) {
    return this.http
      .delete<Product>(this.base_path + '/delete/' +  id, this.httpOptions)
      .pipe(
        shareReplay(1),
        catchError(this.handleError)
      )
  }

}
