import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
const AUTH_API = "http://localhost:3000/api/auth/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  login(username: string, password: string): Observable<any>{
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }
 
  register(username: string, email: string, password: string, organizationName: string, phoneNumber: string, firstName: string, lastName: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password,
      organizationName,
      phoneNumber,
      firstName,
      lastName
    }, httpOptions);
  }

  loggedIn() {
    //Returns true or false if an auth-token exists in the browser
    return !!sessionStorage.getItem('auth-token')
  }
}
