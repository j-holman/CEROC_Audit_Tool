import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

/*
  Role guard and route protector that checks if a user has the admin role ("ROLE_ADMIN") or not.
*/

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private token: TokenStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.token.getUser().roles[0] == "ROLE_ADMIN") {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
    
  }
  
}
