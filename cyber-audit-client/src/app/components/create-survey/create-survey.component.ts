import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {
  questionFields: Array<string> = ['']
  topicFields: Array<string> = ['']
  constructor() { }

  ngOnInit(): void {
    
  }

  addTopicField() {
    console.log(this.topicFields)
  }
  trackTopicsByFn(index: any, item: any) {
    return index;
  }
  addQuestionField() {
    this.questionFields.push('')
    console.log(this.questionFields[0])
    console.log(this.questionFields)
  }  
  trackbyFn(index: any, item: any) {
    return index;
  }

}
