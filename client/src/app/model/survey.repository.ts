import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { Question, Survey, SurveyResponse } from './survey.model';
import { RestDataSource } from './rest.datasource';
import { StaticDataSource } from './static.datasource';
import { Observable } from 'rxjs';
import { TemplateDefinitionBuilder } from '@angular/compiler/src/render3/view/template';

@Injectable()
export class SurveyRepository
{
  private surveyQuestions: Survey[] = [];
  private questions: Question[] = [];
  private responses: SurveyResponse[] = [];

  constructor(private dataSource: RestDataSource)
  {
    dataSource.getSurveyQuestions().subscribe(data => {
      this.surveyQuestions = data;
    });

    dataSource.getAllQuestions().subscribe(data => {
      this.questions = data;
    });

  }

  getSurveyQuestions(): Survey[]
  {
    return this.surveyQuestions;
  }

  getAllQuestions(): Question[]
  {
    return this.questions;
  }

  fetchAllQuestions(): Question[]
  {
    return this.questions;
  }

  saveQuestion(question: Question): Observable<Question>
  {
    return this.dataSource.SaveQuestion(question);
  }

  saveSurvey(survey: Survey): Observable<Survey>
  {
    return this.dataSource.SaveSurvey(survey);
  }

  saveSurveyResponse(surveyResponse: SurveyResponse): Observable<SurveyResponse>
  {
    return this.dataSource.SaveSurveyResponse(surveyResponse);
  }

  getAllSurveyResponses(): SurveyResponse[]
  {
    return this.responses;
  }

}
