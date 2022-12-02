import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './book.model';
import { Question, Survey, SurveyResponse } from './survey.model';
import { JwtHelperService } from '@auth0/angular-jwt'
import { User } from './user.model';

const PROTOCOL = 'http';
const PORT = 3500;



@Injectable()
export class RestDataSource
{
  user: User;

  baseUrl: string;
  authToken: string;

  private httpOptions = 
  {
    
    headers: new HttpHeaders({
      'Content-Type':'application/json',
      'Access-Control-Allow-Origin':'*',
      'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept',
      'responseType': 'text'
    })
  };

  constructor(private http: HttpClient, private jwtService: JwtHelperService)
  {
    this.user = new User();
    this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
  }

  authenticate(user: User): Observable<any>
  {
    return this.http.post<any>(this.baseUrl + 'login', user, this.httpOptions);
  }

  register(user: User): Observable<any>
  {
    debugger
    return this.http.post<any>(this.baseUrl + 'register', user, this.httpOptions);
  }

  storeUserData(token: any, user: User): void
  {
    localStorage.setItem('id_token', 'Bearer ' + token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logout(): Observable<any>
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();

    return this.http.get<any>(this.baseUrl + 'logout', this.httpOptions);
  }

  loggedIn(): boolean
  {
    return !this.jwtService.isTokenExpired(this.authToken);
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

  getAllResponses(): Observable<SurveyResponse[]>
  {
    return this.http.get<SurveyResponse[]>(this.baseUrl + 'survey-list/getresponses');
  }

 
  private loadToken(): void
  {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', this.authToken);
  }
  

}

