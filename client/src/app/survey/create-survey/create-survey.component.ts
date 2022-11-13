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

  get surveyQuestions(): Survey {

    var result =  this.repository
    .getSurveyQuestions();

    var result2 = result.filter(x=> x._id == "6371504b69ed3b157cb659b8")[0];

    console.log(result2);

    return result2;

    // return this.repository
    //   .getSurveyQuestions()[0];
  }

  submitSurvey(): void {
    if(confirm("Are you sure to delete?")) {
      this.router.navigateByUrl('/survey-list');
    }    
  }

  cancel(): void {
    this.router.navigateByUrl('/survey-list');
  }

  cl(name: string) {
    
  }

}
