import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormArray, ValidatorFn, Form } from '@angular/forms'
import { Router } from '@angular/router'
import { UserService } from 'src/app/services/user.service';
import { GetQuestionsService } from 'src/app/services/get-questions.service';
import { PostReportService } from 'src/app/services/post-report.service';
import { Observable } from 'rxjs';
import { CreateReportsService } from 'src/app/services/create-reports.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


const topicId = "1";
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
  selector: 'AccMgmt',
  templateUrl: './acc-mgmt.component.html',
  styleUrls: ['./acc-mgmt.component.css']
})
export class AccMgmtComponent implements OnInit {
  accMgmtForm!: FormGroup;
  nextClicked = false;
  content?: string;
  questions: Question[] = [];
  errorMessage = '';
  currentUser: any;
  reports: Report[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private getQuestionsService: GetQuestionsService,
    private postReportService: PostReportService,
    private createReportService: CreateReportsService,
    private token: TokenStorageService
  ) { }

  ngOnInit(): void {
    //When the page loads, the current user is gotten through their token
    //The form for answers, the array of questions for the database, and the user's report are all pulled
    //From the database or initialized. 
    this.currentUser = this.token.getUser();
    this.initializeForm();
    this.initializeQuestions();
    this.getUserReports();
  }

  //Initializes the survey questions by pulling them from the datbase and storing them in an array called questions
  initializeQuestions() {
    //topicId is passed into the getQuestions function in the getQuestionsService.
    //The topicId is used to pull questions where the topicId matches the correct survey page topic
    //I.e. topicId = 1 resolves to topic = Account Management
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

  //Initializes a form that holds the user's answers to survey questions.
  initializeForm(): void {
    this.accMgmtForm = this.fb.group({
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      answer6: '',
      answer7: '',
      answer8: '',
    });
  }

  //This function gets the reportId from the reports table that matches their userId
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

  //This function posts a users responses to the database.
  postResponses() {
    //Calls the createUser_Reports function from createReportService to make a new entry in the user_reports table
    //Passes in the current users userId and the reportId created in the survey-intro component.
    //To-Do: Add a way to get surveyId as a global variable then pass it through the function.
    this.createReportService.createUser_Reports(this.currentUser.userId, this.reports[0].reportId).subscribe();
  
    //This foor loop iterates through the questions array that is populated with a users answers for the length of the array.
    for(let i = 0; i < this.questions.length; i++){
      //Calls the postUserResponse from the postReportService to make new entries in the responses table.
      //Pass in the current responseId, the questionId, and the users answers from the AccMgmt Form.
      //To-Do: Add a way to get surveyId as a global variable then pass it through the function.
      this.postReportService.postUserResponse(this.reports[0].responseId, this.questions[i].questionId, this.accMgmtForm.get('answer'+(i+1))?.value).subscribe();
    }
  }

  onSubmit(): void {
    /**Forwards */
    if(this.nextClicked) {
      console.log(this.accMgmtForm.value);
      this.postResponses();
      this.router.navigate([ './AccessControl' ])
    }
    /**Backwards */
    else{ 
      console.log(this.accMgmtForm.value);
      this.router.navigate([ './survey-intro' ])
    }
  }
  public onNextClick(): void {
    this.nextClicked = true;
  }
  public onPreviousClick(): void {
    this.nextClicked = false;
  }


}
