import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: any;
  onClicked = false;
  isLoggedIn = false;
  constructor(private token: TokenStorageService,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    if(this.authService.loggedIn() == true) {
      this.isLoggedIn = true;
    }
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

}
