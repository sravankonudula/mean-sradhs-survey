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

  getQuestion(id: string): Question
  {
    return this.questions.find(q => q._id === id);
  }

  // saveQuestion(question: Question): Observable<Question>
  // {
  //   return this.dataSource.SaveQuestion(question);
  // }

  saveQuestion(savedQuestion: Question): void
  {
    
    if (savedQuestion._id === null || savedQuestion._id === undefined)
    {
      debugger
      this.dataSource.SaveQuestion(savedQuestion).subscribe(b => {
        this.questions.push(savedQuestion);
      },error => {
        console.log(error);
        debugger
      });
    }
    else
    {
      debugger
      this.dataSource.updateQuestion(savedQuestion).subscribe(q => {
        this.questions.splice(this.questions.findIndex(b => b._id === savedQuestion._id), 1, savedQuestion);
      },error => {
        console.log(error);
        debugger
      });
    }
  }

  // saveSurvey(survey: Survey): Observable<Survey>
  // {
  //   return this.dataSource.SaveSurvey(survey);
  // }

  saveSurveyResponse(surveyResponse: SurveyResponse): Observable<SurveyResponse>
  {
    return this.dataSource.SaveSurveyResponse(surveyResponse);
  }

  getAllSurveyResponses(): SurveyResponse[]
  {
    return this.responses;
  }

  deleteQuestion(deletedQuestionID: string): void
  {
    this.dataSource.deleteQuestion(deletedQuestionID).subscribe(book => {
      debugger
      this.questions.splice(this.questions.findIndex(b => b._id === deletedQuestionID), 1);
    });
  }

  updateQuestion(updatedQuestion: Question): void
  {
    this.dataSource.updateQuestion(updatedQuestion).subscribe(question => {
      this.questions.splice(this.questions.findIndex(o => o._id === question._id), 1, question);
    });
  }

  deleteSurvey(deletedQuestionID: string): void
  {
    this.dataSource.deleteSurvey(deletedQuestionID).subscribe(book => {
      debugger
      this.surveyQuestions.splice(this.surveyQuestions.findIndex(b => b._id === deletedQuestionID), 1);
    });
  }

  saveSurvey(savedSurvey: Survey): void
  {
    
    if (savedSurvey._id === '0' || savedSurvey._id === null || savedSurvey._id === undefined)
    {
      debugger
      this.dataSource.SaveSurvey(savedSurvey).subscribe(b => {
        this.surveyQuestions.push(savedSurvey);
      },error => {
        console.log(error);
        debugger
      });
    }
    else
    {
      debugger
      this.dataSource.updateSurvey(savedSurvey).subscribe(book => {
        this.surveyQuestions.splice(this.surveyQuestions.findIndex(b => b._id === savedSurvey._id), 1, savedSurvey);
      },error => {
        console.log(error);
        debugger
      });
    }
  }

  updateSurvey(savedSurvey: Survey): void
  {
    this.dataSource.updateSurvey(savedSurvey).subscribe(survey => {
      this.surveyQuestions.splice(this.surveyQuestions.findIndex(o => o._id === survey._id), 1, survey);
    });
  }


}
