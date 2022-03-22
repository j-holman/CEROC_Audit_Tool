import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//API_URL for creating responses. 
const REPORT_API = "http://localhost:3000/api/reports/create";
const REPORT_FIND_API = "http://localhost:3000/api/reports/find?userId";
const REPORT_FIND_ALL_API = "http://localhost:3000/api/reports/findAll";
const USER_REPORT_API = "http://localhost:3000/api/user-reports/create";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CreateReportsService {

  constructor(private http: HttpClient) { }

  //REPORTS TABLE: Args: userId, surveyId from Survey Table
  //Sends a HTTP post request to the REPORT_API (server url) passing in the userId and surveyId as the body.
  //To-Do: Add surveyId as another argument once we figure out how to set the surveyId globally.
  createUserReport(userId: string, surveyId: number): Observable<any>{
    return this.http.post(REPORT_API, {
      userId,
      surveyId,
    }, httpOptions);
  }
  //Sends a HTTP get request to the REPORT_FIND_API (server url) with the userId concatanated at the end.
  //This function queries the reports table for all reports where the userId = userId passed in.
  findReportsByUserId(userId: string): Observable<any> {
    return this.http.get<any>(REPORT_FIND_API + userId);
  }

  findAllReports(): Observable<any> {
    return this.http.get<any>(REPORT_FIND_ALL_API);
  }
  
  //USER_REPORTS TABLE: Args: userId, reportId
  //Sends an HTTP post request to the USER_REPORT_API (server url for user_reports table) passing in a userId and reportId as the body.
  //To-Do: Add surveyId as another argument once we figure out how to set the surveyId globally.
  createUser_Reports(userId: string, reportId: string): Observable<any> {
    return this.http.post(USER_REPORT_API, {
      userId,
      reportId
    }, httpOptions);
  }

}
