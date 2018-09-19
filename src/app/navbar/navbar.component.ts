import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { GlobalEventsManager } from '../global-events-manager';
import { Menu } from '../models/menu';
import { ElementArrayFinder } from 'protractor';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { eventNames } from 'cluster';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  //isLoggined: Boolean = false;

  listMenus: Menu[] = [];
  showNavBar: boolean = false;
  navIcon: Menu;

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private globalEventsManager: GlobalEventsManager) {

    if (localStorage.getItem('userMenu')) {
      this.showNavBar = true;
      this.listMenus = JSON.parse(localStorage.getItem('userMenu'));
    }

    this.router.events
      .filter((event) => event instanceof NavigationEnd) 
      .subscribe((event) => {
        console.log('NavigationEnd:', router.url);
        this.navIcon = this.listMenus.find(s=>s.menuUrl==router.url);
        console.log(this.navIcon);
        localStorage.setItem("activeNav", JSON.stringify(this.navIcon));
      });

    /*
       router.events.subscribe((res: any) => { 
           console.log(res); 
       });
   
      
     this.globalEventsManager.showNavBar.subscribe((mode: any) => {
       console.log(mode);
       this.showNavBar = mode;
       console.log(this.showNavBar);
       if (this.showNavBar) {
         this.listMenus = this.getMenus();
         console.log(this.listMenus);
       }
     });
   
     this.globalEventsManager.hideNavBar.subscribe((mode: any) => {
       console.log(mode);
       this.showNavBar = mode;
     });
     */
  }

  ngOnInit() {
    /*
    if (localStorage.getItem('currentUser'))
      this.isLoggined = true;
      */
  }

  private getMenus() {
    if (localStorage.getItem('userMenu')) {
      return JSON.parse(localStorage.getItem('userMenu'));
    }
    return [];
  }

  onLogout() {
    console.log('logout');
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  get userLogin(): any {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser.userName + ' ' + currentUser.userSurname;
  }
}
