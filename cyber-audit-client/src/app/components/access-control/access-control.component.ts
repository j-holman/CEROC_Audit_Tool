import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, ValidatorFn, Form } from '@angular/forms'
import { Router } from '@angular/router'
import { GetQuestionsService } from 'src/app/services/get-questions.service';
import { PostReportService } from 'src/app/services/post-report.service';
import { CreateReportsService } from 'src/app/services/create-reports.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


const topicId = "2";
export class Question {
  constructor(
    public questionId: number,
    public surveyId: number,
    public topicId: number,
    public question: string
  ) {}
}
export class Report {
  constructor(
    public reportId: string,
    public responseId: string
  ){}
}

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.css']
})

export class AccessControlComponent implements OnInit {
  accessControlForm!: FormGroup;
  nextClicked = false;
  questions: Question[] = [];
  errorMessage = '';
  currentUser: any;
  reports: Report[] = [];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private getQuestionsService: GetQuestionsService,
    private postReportService: PostReportService,
    private createReportService: CreateReportsService,
    private token: TokenStorageService
  ) {}

  ngOnInit(): void {
    //When the page loads, the current user is gotten through their token
    //The form for answers, the array of questions for the database, and the user's report are all pulled
    //From the database or initialized. 
    this.currentUser = this.token.getUser();
    this.initializeForm();
    this.initializeQuestions();
    this.getUserReports();
  }

  initializeQuestions() {
    this.getQuestionsService.getQuestions(topicId).subscribe(
      response => {
        console.log(response);
        this.questions = response;
        return this.questions;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    )
  }

  initializeForm(): void {
    this.accessControlForm = this.fb.group({
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: ''
    });
  }

  getUserReports() {
    //Calls the findReportsByUserId function from the createReportService. Passes in userId as an argument.
    this.createReportService.findReportsByUserId(this.currentUser.userId).subscribe(
      response => {
        //The response (row from the reports table) is stored in a reports array that holds a report object with 
        //the user's reportId and responseId. responseId is needed when posting responses to the database. 
        this.reports = response;
        return this.reports;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage)
      }
    )
  }
  postResponses() {
    //This foor loop iterates through the questions array that is populated with a users answers for the length of the array.
    for(let i = 0; i < this.questions.length; i++){
      //Calls the postUserResponse from the postReportService to make new entries in the responses table.
      //Pass in the current responseId, the questionId, and the users answers from the AccMgmt Form.
      //To-Do: Add a way to get surveyId as a global variable then pass it through the function.
      this.postReportService.postUserResponse(this.reports[0].responseId, this.questions[i].questionId, this.accessControlForm.get('answer'+(i+1))?.value).subscribe();
    }
  }

  onSubmit(): void {
    /**Forward */
    if(this.nextClicked) {
      console.log(this.accessControlForm.value);
      this.postResponses();
      this.router.navigate([ './audit-account' ])
    }
    /**Backwards */
    else{ 
      console.log(this.accessControlForm.value);
      this.router.navigate([ './AccMgmt' ])
    }
  }
  public onNextClick(): void {
    this.nextClicked = true;
  }
  public onPreviousClick(): void {
    this.nextClicked = false;
  }

}
