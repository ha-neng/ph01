import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ResponseType, RequestOptions, RequestMethod } from '@angular/http';
import { map } from 'rxjs/operators';


const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }),
  ResponseType: 'json'
};
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedIn = false;
 // private authNavStatusSource = new BehaviorSubject<boolean>(false);

  //_loginResult: loginResult;

  constructor(private http: HttpClient, private router: Router) {
    //  this.isLoggedIn = !!localStorage.getItem('token');
    //  this.authNavStatusSource.next(this.isLoggedIn);
  }

  /*
  get isLoggIn() {
    return this.authNavStatusSource.asObservable();
  }
  */

  register(userCode: string, password: string, userName: string, userSurname: string, email: string) {
    let body = JSON.stringify({ userCode, password, userName, userSurname, email });
    return this.http.post<any>("http://localhost:30130/api/account/register", body, httpHeaders).pipe(
      map(user => {
        console.log(user);
        console.log(user.token);
        console.log(user.menus);
        if (user) {
          localStorage.setItem('token', JSON.stringify(user.token));
          localStorage.setItem('currentUser', JSON.stringify(user.user));
         // this.authNavStatusSource.next(true);
        }
        return user;
      })
    );
  }

  login(userCode: string, password: string) {
    let body = JSON.stringify({ userCode, password });

    return this.http.post<any>("http://localhost:30130/api/account/login", body, httpHeaders).pipe(
      map(user => {
        console.log(user);
        if (user) {
          localStorage.setItem('token', JSON.stringify(user.token));
          localStorage.setItem('currentUser', JSON.stringify(user.user));
          localStorage.setItem('userMenu', JSON.stringify(user.menus)); 
         // this.authNavStatusSource.next(true);
        }
        return user;
      })
    );


    /*
    var result = this.http.post("http://localhost:30130/api/account/login", body, httpHeaders);
    result.subscribe(result => {
      this._loginResult = <loginResult>result;
      console.log(this._loginResult);

      localStorage.setItem('token', this._loginResult.token);
      localStorage.setItem('userLogin', this._loginResult.userName + ' ' + this._loginResult.userSurname);
      this.isLoggedIn = true;
      this.authNavStatusSource.next(true);
      console.log(this._loginResult);


    }, (err: HttpErrorResponse) => {
      console.log(err);
    });
    return result;
    */
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userMenu');
  //  this.isLoggedIn = false;
  //  this.authNavStatusSource.next(true);
  }

 /*
  checkLoggedIn() {
    return this.isLoggedIn;
  }
  */
}

/*
export interface loginResult {
  token: string;
  userName: string;
  userSurname: string;
  email: string;
}
*/