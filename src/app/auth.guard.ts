import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public auth : AuthService,public router: Router){}
  canActivate(    
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if(localStorage.getItem('token')){
      this.auth.loggedIn.next(true);
      return true;
    }else{
      this.router.navigate(['login']);
      this.auth.loggedIn.next(false);
      return false;
    }    
  }
}
