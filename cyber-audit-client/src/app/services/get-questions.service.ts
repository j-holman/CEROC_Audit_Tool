import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';
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

const API_URL = 'http://localhost:3000/api/questions/find?topicId='
const ALL_QUESTIONS_API_URL = 'http://localhost:3000/api/questions/find?topicId='
const UPDATE_QUESTION_API_URL = 'http://localhost:3000/api/questions/update?questionId='
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GetQuestionsService {
 
  allQuestions!: Observable<any>
  
  constructor(private http: HttpClient) { }
  //Gets Questions by topicId
  getQuestions(topicId: string): Observable <any> {
    return this.http.get<any>(API_URL + topicId);
  }

  getAllQuestions(): Observable<any> {
    this.allQuestions = this.http.get<any>(ALL_QUESTIONS_API_URL);
    localStorage.setItem("questions", JSON.stringify(this.allQuestions))
    return this.allQuestions;
  }

  updateQuestion(questionId: number, question: string): Observable<any> {
    return this.http.put(UPDATE_QUESTION_API_URL + questionId, {
      question
    }, httpOptions);
  }
}
