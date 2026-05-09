import { Injectable } from '@angular/core';
import { QuestionAnswer } from '../interface/questionAnswer';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionAnswerService {
  private apiUrl = 'http://127.0.0.1:8000/questionsanswers/'; // replace with your API URL
 

  constructor(private http: HttpClient) { }

  getQuestionsAnswers(pageSize : number, page: number = 0): Observable<any> {
    return this.http.get<any>(this.apiUrl + '?limit=' + pageSize+ '&offset=' +  page * pageSize);
  }

  getQuestionAnswer(id: number): Observable<QuestionAnswer> {
    return this.http.get<QuestionAnswer>(this.apiUrl + id + '/');
  }	

  createQuestionAnswer(questionAnswer: QuestionAnswer): Observable<QuestionAnswer> {
    return this.http.post<QuestionAnswer>(this.apiUrl, questionAnswer);
  }

  updateQuestionAnswer(questionAnswer: QuestionAnswer): Observable<QuestionAnswer> {
    return this.http.put<QuestionAnswer>(this.apiUrl + questionAnswer.id + '/', questionAnswer);
  }

  deleteQuestionAnswer(questionAnswer: QuestionAnswer): Observable<QuestionAnswer> {
    return this.http.delete<QuestionAnswer>(this.apiUrl + questionAnswer.id + '/');
  }

}
