import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pharma-ui';
  apiUrl = 'http://localhost:30130/api/supplier';
  data: any = {};
  ItemObservable: Observable<any>;

  constructor(private http: Http, private userService: UserService, private router: Router) {
    console.log('app start');
    /*
    this.http.get(this.apiUrl).pipe(map(res => res.json())).subscribe(
      (data) => this.onData(data),
      (error) => this.onError(error),
      () => this.onDone()
    );
    */
  }

  onData(data) {
    console.log(data);
    this.ItemObservable = data;
  }

  onError(error) { 
    console.log(error);
  }

  onDone() {
    alert('done');
  }

  getData() {
    return this.http.get(this.apiUrl).pipe(map(res => res.json()));
  }

  getSupplier() {
    this.getData().subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
