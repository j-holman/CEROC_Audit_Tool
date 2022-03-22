import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isAdmin = false;
  isUser = false;
  isLoggedIn = false;
  isCollapsed = false;
  constructor(private token: TokenStorageService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.token.getUser().roles[0]=="ROLE_ADMIN") {
      this.isAdmin = true;
    }
    if(this.token.getUser().roles[0]=="ROLE_USER") {
      this.isUser = true;
    }
    if(this.authService.loggedIn() == true) {
      this.isLoggedIn = true;
    }
  }
  
  logout() {
    this.token.signOut();
    window.location.reload();
  }

  reloadPage(): void {
    window.location.reload();
  }

}
