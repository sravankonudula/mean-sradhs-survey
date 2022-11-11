import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { Survey } from '../../model/survey.model';


@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css']
})
export class CreateSurveyComponent implements OnInit {

  constructor(    
    private repository: SurveyRepository,
    private router: Router) { }

  ngOnInit(): void {
  }

  get surveyQuestions(): Survey[] {
    return this.repository
      .getSurveyQuestions();
  }

  submitSurvey(): void {
    this.router.navigateByUrl('/create-survey');
  }

  cancel(): void {
    this.router.navigateByUrl('/survey-list');
  }

}
