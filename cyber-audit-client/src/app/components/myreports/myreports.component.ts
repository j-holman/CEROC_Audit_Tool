import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateReportsService } from 'src/app/services/create-reports.service';
import { ReportDataService } from 'src/app/services/report-data.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
export class Report {
  constructor (
    public userId: string,
    public reportId: string,
    public surveyId: number,
    public responseId: string,
    public users: [{
      username: string
    }]
  ) {}
}

@Component({
  selector: 'app-myreports',
  templateUrl: './myreports.component.html',
  styleUrls: ['./myreports.component.css']
})
export class MyreportsComponent implements OnInit {

  reports: Report[] = [];
  
  errorMessage = '';
  currentUser: any;

  constructor(
    private createReportsService: CreateReportsService,
    private reportData: ReportDataService,
    private router: Router, 
    private token: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.initializeReports(this.currentUser.userId)
  }
  
  initializeReports(userId: string) {
    this.createReportsService.findAllReports().subscribe(
      response => {
        this.reports = response;
        //For loop to remove reports where userId != current userId
        for(let i = 0; i < this.reports.length; i++) {
          if(this.reports[i].userId != userId) {
            this.reports.splice(i, 1)
          }
        }
        return this.reports;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    )
  }

}
