import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Observable } from 'rxjs';

/*
  Authorization guard and route protector that checks if a user is logged in or not.
*/
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private token: TokenStorageService) { }

  canActivate(): boolean {
    if(this.authService.loggedIn()) {
      return true //If token is found (user is logged in and has a token) then they can access routes.
    } else {
      this.router.navigate(['./login'])
      return false//Else navigate to login page
    }
  }
}
