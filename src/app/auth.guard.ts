import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { GlobalEventsManager } from './global-events-manager';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router,
    private globalEventsManager: GlobalEventsManager) { }

  canActivate() {

    if (localStorage.getItem('currentUser')) {
      console.log(localStorage.getItem('currentUser'));
      this.globalEventsManager.showNavBar.emit(true);
      return true;
    } else {
      this.globalEventsManager.hideNavBar.emit(true);
      this.router.navigate(['/login']);
      return false;
    }

    /*
   console.log(this.userService.checkLoggedIn());
   if (!this.userService.checkLoggedIn()) {
     this.router.navigate(['/login']);
     return false;
   } 
   return true;
  
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
   return true;
   */
  }
}
