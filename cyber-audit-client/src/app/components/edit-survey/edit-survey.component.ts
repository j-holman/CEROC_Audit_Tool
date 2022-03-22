import {Component, OnInit} from '@angular/core';
import {Observable, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { SurveysService } from 'src/app/services/surveys.service';
import { GetQuestionsService } from 'src/app/services/get-questions.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';


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

export class Survey {
  constructor(
    public surveyId: number,
    public surveyName: string,
    public creator: string,
    public questions: [{
      question: string,
      topicId: number
    }]
  ) {}
}

  @Component({
    selector: 'app-edit-survey',
    templateUrl: './edit-survey.component.html',
    styleUrls: ['./edit-survey.component.css']
  })
export class EditSurveyComponent implements OnInit{
  public model: any; //Model for the search function to get typeahead to work.
  updateForm!: FormGroup;
  questions: Question[] = []; //Array of question objects
  surveys: Survey[] = []; //Array of survey objects
  surveyNames: string[] = []; //Array of survey names for search bar.
  numTopicsArray: number[] = []; //ngFor array for the number of topics.
  topicNames: string[] = []; //Array of Topic Names to display in the html
  errorMessage = '';
  selectedSurvey = '';
  
  constructor(
    private surveyService: SurveysService,
    private questionService: GetQuestionsService,
    private fb: FormBuilder
    ) {}

  ngOnInit(): void{
    this.getAllSurveys();
    this.getAllQuestions();
  }

  getAllSurveys() {
    this.surveyService.getAllSurveys().subscribe(
      response => {
        console.log(response);
        this.surveys = response;
        return this.surveys;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    )
  }


  getAllQuestions() {
    this.questionService.getAllQuestions().subscribe(
      response => {
        // console.log(response);
        this.questions = response;
        //Dont think this loop is needed.
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
        for(let i = 0; i < this.questions.length; i++) {
          group[`newQuestion${i+1}`] = [''];
        }
        this.updateForm = this.fb.group(group)
        return this.questions;
      },
      err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
      }
    )
  }
  
  updateQuestions() {
    //Doesn't include functionality to check surveyId so this only updates questions when there is one survey that exists.
    let j = 0;
    //Loop through the amount of questions.
    for(let i = 0; i < this.questions.length; i++) {
      //Store the current questionId in a variable.
      let questionId = this.questions[i].questionId
      if(this.updateForm.get(`newQuestion${i+1}`)?.value === "") {
        //if the form group value at index i+1 is an empty string do nothing
      }
      else { //Else a question has been updated.
        //Store the value in the form group in a variable and pass the updated question and question id to the update service.
        let updatedQuestion = this.updateForm.get(`newQuestion${i+1}`)?.value
        this.questionService.updateQuestion(questionId, updatedQuestion).subscribe()
      }
    }
    
  }

  onSubmit() {
    this.updateQuestions()
  }

  getSurveyNames() {
    for(let i = 0; i < this.surveys.length; i++) {
      this.surveyNames[i] = this.surveys[i].surveyName;
    }
    return this.surveyNames;
  }
 
  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.surveyNames.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
  
  

}
