import { Component, OnDestroy } from '@angular/core';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
import { TokenStorageService } from './services/token-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'angular-src';
  subscriptions: Array<Subscription> = [];

  private roles: string[] = [];
  isLoggedIn = false;
  username?: string


  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken()
      if(this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;
        this.username = user.username;
      }
}

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestory() {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}

