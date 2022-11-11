import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { Survey } from './survey.model';
import { RestDataSource } from './rest.datasource';
import { StaticDataSource } from './static.datasource';

@Injectable()
export class SurveyRepository
{
  private surveyQuestions: Survey[] = [];
  private authors: string[] = [];

  constructor(private dataSource: RestDataSource)
  {
    dataSource.getSurveyQuestions().subscribe(data => {
      this.surveyQuestions = data;
    });
  }

  getSurveyQuestions(): Survey[]
  {
    return this.surveyQuestions;
  }

}
