import { Component, OnInit } from '@angular/core';
import { CreateReportsService } from 'src/app/services/create-reports.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-survey-intro',
  templateUrl: './survey-intro.component.html',
  styleUrls: ['./survey-intro.component.css']
})

export class SurveyIntroComponent implements OnInit {
  currentUser: any;
  errorMessage = '';
  constructor(private createReportService: CreateReportsService, private router: Router, private token: TokenStorageService) { }

  ngOnInit(): void {
    //Getting the user on init so that we can access the UserID when making entry in User_Reports Table.
    this.currentUser = this.token.getUser();
    console.log(this.currentUser.userId)
  }

  //On click of the start survey button, call the createReportService to insert new row into Reports Table
  onClick() {
    //Args: userId and SurveyID
    //Need SurveyId from survey table
    //Create ResponseId and then access in survey pages. 
    this.createReportService.createUserReport(this.currentUser.userId, 1).subscribe();
    this.router.navigate([ './AccMgmt' ])
  }
}
