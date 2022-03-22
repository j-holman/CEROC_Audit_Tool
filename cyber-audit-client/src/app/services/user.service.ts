//Service used to communicate with api endpoints. Persist through site if user doesn't close tab. 
//Need one for each table. This is the Users table Service.

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const API_URL = 'http://localhost:3000/api/users/find';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable <any> {
    return this.http.get<any>(API_URL);
  }
}

