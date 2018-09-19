import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  token: ShadowRootInit;
  form: FormGroup;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      userCode: new FormControl(),
      password: new FormControl(),
      userName: new FormControl(),
      userSurname: new FormControl(),
      email: new FormControl()
    });
  }

  onSubmit(submitBtn: HTMLButtonElement) {
 
    if (this.form.valid) { 
      submitBtn.disabled = true;
      this.userService
        .register(this.form.controls.userCode.value, this.form.controls.password.value,
          this.form.controls.userName.value, this.form.controls.userSurname.value, 
          this.form.controls.email.value)
        .subscribe(result => {
          if (result) {
            this.router.navigate(['/']);
          };
        },(err: HttpErrorResponse) => {
          console.log(err);
        });
    }
  }
}
