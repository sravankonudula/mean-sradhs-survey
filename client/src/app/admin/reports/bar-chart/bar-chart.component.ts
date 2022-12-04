import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Answer, Question, Survey, SurveyResponse } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  allquestions: Question[];
  allsurveys: Survey[];
  allsurveyresponses: SurveyResponse[];
  currentSurevyId: String; 
  
  constructor(
    private router: Router,
    public question: Question,
    private dataSource: RestDataSource,
    public activeRoute: ActivatedRoute) {
      this.currentSurevyId = activeRoute.snapshot.params.id;
     }

ngOnInit(): void {
    this.dataSource.getAllQuestions().subscribe(data => {
      this.allquestions = data;
      this.allquestions.forEach(x => x.checked = false);

      this.dataSource.getSurveyQuestions().subscribe(data => {
        this.allsurveys = data;

        this.dataSource.getAllResponses().subscribe(data => {
          debugger
          this.allsurveyresponses = data;
        });

      });

    });
  }
}
