import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Survey } from '../model/survey.model';
import { SurveyRepository } from '../model/survey.repository';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(    
    private repository: SurveyRepository,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  createSurvey(): void {
    this.router.navigateByUrl('/create-question');
  }

  get surveyQuestions(): Survey[] {
    return this.repository
      .getSurveyQuestions();
  }

  

  respondToSurvey(): void {
    this.router.navigateByUrl('/create-survey');
  }
  
}
