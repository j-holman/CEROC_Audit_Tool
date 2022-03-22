import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//API_URL for creating responses. 
const RESPONSES_API = "http://localhost:3000/api/responses/create";
const RESPONSES_BY_RESPONSEID_API = "http://localhost:3000/api/responses/findByResponseId?responseId="
const ADD_MOD_RESPONSE_API = "http://localhost:3000/api/responses/update/"
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class PostReportService {
  constructor(private http: HttpClient) { }
  //Method for sending user survey responses to the response table in the database.
  //Sends a HTTP post request to the RESPONSES_API (server url) passing in the responseId, questionId, and user_response as the body.
  postUserResponse(responseId: string, questionId: number, user_response: string): Observable<any>{
    return this.http.post(RESPONSES_API, {
      responseId,
      questionId,
      user_response
    }, httpOptions);
  }
  //Method for sending mod responses to the response table in the database.
  //Sends a HTTP put to the RESPONSES_API (server url) passing in responseId, questionId, and mod_response as the body.
  postModResponse(Id: number, mod_response: string): Observable<any> {
    return this.http.put(ADD_MOD_RESPONSE_API + Id, {
      mod_response
    }, httpOptions);
  }

  getUserResponse(responseId: string): Observable<any> {
    return this.http.get(RESPONSES_BY_RESPONSEID_API + responseId)
  }
  

  loggedIn() {
    //Returns true or false if an auth-token exists in the browser
    return !!sessionStorage.getItem('auth-token')
  }
}
