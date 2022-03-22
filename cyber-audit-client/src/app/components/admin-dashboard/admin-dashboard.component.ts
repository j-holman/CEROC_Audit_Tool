import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {

  constructor( private tokenStorage: TokenStorageService, private router: Router) { }

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = []

  ngOnInit(): void {
    if(this.tokenStorage. getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

}
