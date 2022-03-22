import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    password: null,
    organizationName: null,
    phoneNumber: null,
    firstName: null,
    lastName: null
  };

  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router  
    ) { }

  ngOnInit(): void {
  }
  
  onSubmit() {
    const { username, email, password, organizationName, phoneNumber, firstName, lastName } = this.form;

    this.authService.register(username, email, password, organizationName, phoneNumber, firstName, lastName).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['./login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true
      }
    );

  }
}
