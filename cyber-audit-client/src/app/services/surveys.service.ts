import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const SURVEYS_API_URL = "http://localhost:3000/api/surveys/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(private http: HttpClient) { }

  getAllSurveys(): Observable<any> {
    return this.http.get<any>(SURVEYS_API_URL + "findAll")
  }
}
