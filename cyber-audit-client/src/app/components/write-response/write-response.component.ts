import { Component, OnInit } from '@angular/core';
import { ReportDataService } from 'src/app/services/report-data.service';
import { GetQuestionsService } from 'src/app/services/get-questions.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostReportService } from 'src/app/services/post-report.service';
import { Router } from '@angular/router';
//TO-DO
//Add a dropdown thing for references or something

const topicId = "1";
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
export class Question {
  constructor(
    public questionId: number,
    public surveyId: number,
    public topicId: number,
    public question: string,
    public topic: {
      topicId: number,
      topic: string
    }
  ) {}
}
export class Response {
  constructor(
    public Id: number,
    public responseId: string,
    public questionId: number,
    public user_response: string,
    public mod_response: string,
    public question: {
      topicId: string
    }

  ) {}
}

@Component({
  selector: 'app-write-response',
  templateUrl: './write-response.component.html',
  styleUrls: ['./write-response.component.css']
})
export class WriteResponseComponent implements OnInit {
  report!: Report;
  modResponseForm!: FormGroup;
  questions: Question[] = [];
  errorMessage = '';
  responses: Response[] = [];
  topicNames: string[] = [];
  numTopicsArray: number[] = [];
  
  constructor(
    private reportData: ReportDataService,
    private getQuestionsService: GetQuestionsService,
    private fb: FormBuilder,
    private reportService: PostReportService,
    private router: Router
  ) {
    
   }

  ngOnInit(): void {
    this.report = this.reportData.getReportData();
    // this.initializeForm();
    // this.initializeQuestions();
    this.initializeResponses();
    this.getAllQuestions();
  }

  getAllQuestions() {
    this.getQuestionsService.getAllQuestions().subscribe(
      response => {
        // console.log(response);
        this.questions = response;
        //To-Do: Probably need to move this to its own function, were its called when the surveyname is selected or something.
        //Loop that fills the topicNames array with all the topic names in the topics table.
        for(let i = 0; i < this.questions.length; i++) {
          if(this.topicNames.length == 0) { //If the array is empty, push the first topicName to the array.
            this.topicNames.push(this.questions[i].topic.topic);
          }
          else { //Else the array is not empty. 
            for(let j = 0; j < this.topicNames.length; j++) { //Iterate through the array
              if(this.topicNames[j] == this.questions[i].topic.topic) { //If the name already exists in the array, do nothing
              }
              else { // Else push the topic name to the array.
                this.topicNames.push(this.questions[i].topic.topic);
                if(this.topicNames.length > j+2) { //To prevent duplicate topic names pop the last item if the length of topicNames exceeds the index j + 2. 
                  this.topicNames.pop();
                }
              }
            }
          }
        }
        let group = {};
        //Creates a dynamically sized form group of the amount of questions that holds mod responses.
        for(let i = 0; i < this.questions.length; i++) {
          group[`answer${i+1}`] = [''];
        }
        this.modResponseForm = this.fb.group(group);
        return this.questions;
        
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    )
  }
  
  initializeResponses() {
    this.reportService.getUserResponse(this.report.responseId).subscribe(
      response => {
        this.responses = response;
        return this.responses;
      },
      err => {
        this.errorMessage = err.error.message;
      }
    )
  }


  postModResponses() {
    for(let i = 0; i < this.questions.length; i++) {
      this.reportService.postModResponse(this.responses[i].Id, this.modResponseForm.get('answer'+(i+1))?.value).subscribe();
    }
  }

  onSubmit(): void {
    //Update row in responses with mod response
    //To-Do: Add a service somewhere with put request, write update in response model
    this.postModResponses();
    console.log(this.modResponseForm.value)
    
  }

}
