import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';
import { Question, Survey, SurveyResponse } from './survey.model';
import { JwtHelperService } from '@auth0/angular-jwt'

const PROTOCOL = 'http';
const PORT = 3500;



@Injectable()
export class RestDataSource
{
  baseUrl: string;
  authToken: string;

  private httpOptions = 
  {
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept'
    })
  };

  constructor(private http: HttpClient, private jwtService: JwtHelperService)
  {
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  getBooks(): Observable<Book[]>
  {
    return this.http.get<Book[]>(this.baseUrl + 'book-list');
  }

  getSurveyQuestions(): Observable<Survey[]>
  {
    return this.http.get<Survey[]>(this.baseUrl + 'survey-list');
  }

  getAllQuestions(): Observable<Question[]>
  {
    return this.http.get<Question[]>(this.baseUrl + 'questions');
  }

  SaveQuestion(question: Question): Observable<Question>
  {
    console.log(JSON.stringify(question));
    return this.http.post<Question>(this.baseUrl + 'questions/add', question);
  }

  SaveSurvey(survey: Survey): Observable<Survey>
  {
    console.log(JSON.stringify(survey));
    return this.http.post<Survey>(this.baseUrl + 'survey-list/add', survey);
  }

  SaveSurveyResponse(surveyResponse: SurveyResponse): Observable<SurveyResponse>
  {
    console.log(JSON.stringify(surveyResponse));
    return this.http.post<SurveyResponse>(this.baseUrl + 'survey-list/addresponse', surveyResponse);
  }

 
  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
  

}

