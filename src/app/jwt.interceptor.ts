import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest, HttpResponse,
    HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from './services/alert.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private injector: Injector, private alertService: AlertService) { }

    private handleError(err: HttpErrorResponse): Observable<any> {
        let errorMsg;
        console.log(err);
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMsg = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMsg = `Backend returned code ${err.status}, body was: ${err.error}`;
        }
        if (err.status === 404 || err.status == 401) {
            //  this.injector.get(UserService).purgeAuth();
            //  this.injector.get(ToasterService).showError(`Unauthorized`, errorMsg);
            this.injector.get(Router).navigateByUrl(`/login`);
        }
        if (err.status === 403) {
            errorMsg = 'Your permission is Forbidden';
        }

        console.log(errorMsg);
        this.alertService.alert(
            "คำเตือน!",
            err.error);
        return Observable.throw(errorMsg);
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('Interceptor request ran..');
        const started = Date.now();  // เวลาเริ่มต้นที่ request 

        // add authorization header with jwt token if available
        let token = JSON.parse(localStorage.getItem('token'));
        console.log(token);

        request = request.clone({
            setHeaders: {
                'x-api-key': `12345`
            }
        }); 
        if (token) { 
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }); 
        } 

        console.log(request);
        return next.handle(request).pipe(tap(event => {
            if (event instanceof HttpResponse) {
                // หาช่วงเวลาที่ใช้ในการรับส่งข้อมูล เวลาที่ response ส่งค่ากลับมา ลบด้วยเวลา เริ่มต้น
                const elapsed = Date.now() - started;
                // แสดง url ที่ทำการ request ไป ว่าใช้เวลาไปกี่ มิลลิวินาที
                console.log(`Request for ${request.urlWithParams} took ${elapsed} ms.`);
            }
        }), catchError(err => this.handleError(err)));
        //return next.handle(request).catchError(err => this.handleError(err));
        //return next.handle(request).pipe(catchError(err => this.handleError(err)));
    }
}