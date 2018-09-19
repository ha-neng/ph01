import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
//import { AlertService } from '../services/alert.service';
import { Observable } from 'rxjs';
import { isPending } from 'q';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: string;
  form: FormGroup;

  constructor(
    private userService: UserService, 
    //private alertService: AlertService,
    private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      userCode: new FormControl(),
      password: new FormControl()
    });
  }

  onSubmit() {

    this.userService.login(this.form.controls.userCode.value, this.form.controls.password.value)
    .subscribe( 
      data=> {
        console.log(data);
        this.router.navigate(['/home']);
      },
      error=> {
        console.log(error);        
        console.log(error.error); 
        /*
        this.alertService.alert(
          "คำเตือน!",
          error.error)
          .subscribe((answer) => {
            console.log(answer);
          });
          */
      }
    );
      /*  console.log(result);
   
      result.subscribe(
         data => {
           console.log(data);
           console.log(data['token']);
         },
         err => console.log(err),
         () => console.log('done')
       );
   
      
          result.subscribe(result => { 
            console.log(result); 
           
            localStorage.setItem('token', result.token);
            localStorage.setItem('userLogin', result.userName + ' ' + result.userSurname);
            this.isLoggedIn = true;
            this.authNavStatusSource.next(true);
            console.log(this._loginResult);
           
      
          });
         
      .subscribe(result => {
        console.log(result);
        if (result) {
          this.router.navigate(['/home']);
        }
      });
 */
  }
}