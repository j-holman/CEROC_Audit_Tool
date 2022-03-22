import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Data } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export class User{
  constructor(
    public userId: number,
    public username: string,
    public email: string,
    public organizationName: string,
    public phoneNumber: string,
    public firstName: string,
    public lastName: string,
    public roles: [{
      name: string
    }]
  ) {}
}

@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.css']
})
export class UserMgmtComponent implements OnInit {
  
  
  users: User[] = [];
  errorMessage = '';
  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeUsers();
    console.log("USER OBJECT HERE")
    console.log(JSON.stringify(this.users[1]));
  }
  
  initializeUsers() {
    this.userService.getUsers().subscribe(
      response => {
        console.log(response);
        this.users = response;
        return this.users;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    )
  }
  

}
