import { Component } from '@angular/core';
import { Menu } from '../models/menu';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from "@angular/router"; 

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styles: []
})
export class HomeLayoutComponent { 

  constructor() {
  }

  get activeNav(): any {
    if (localStorage.getItem('activeNav')) {
      return JSON.parse(localStorage.getItem('activeNav')); 
    }
  }

  get userLogin(): any {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.userName + ' ' + currentUser.userSurname;
  }

}



  /*
  template: `  
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,*/