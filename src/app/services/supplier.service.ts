import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseType, RequestOptions, RequestMethod } from '@angular/http';
import { map } from 'rxjs/operators';
import { Supplier } from '../models/supplier';

const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }),
  ResponseType: 'json'
};

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: HttpClient, private router: Router) { }

  getSupplier() {
    return this.http.get<any>("http://localhost:30130/api/supplier").pipe(
      map(result => {
        console.log(result);
        return result.data;
      })
    );
  };

  save(supplier: Supplier) {
    let body = JSON.stringify(supplier);
    return this.http.post<any>("http://localhost:30130/api/supplier", body, httpHeaders).pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }

  update(supplier: Supplier) {
    let body = JSON.stringify(supplier);
    return this.http.put<any>("http://localhost:30130/api/supplier", body, httpHeaders).pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }

  delete(supplierId: number) {
    return this.http.delete("http://localhost:30130/api/supplier/" + supplierId, httpHeaders).pipe(
      map(result => {
        console.log(result);
        return result;
      })
    );
  }
}
