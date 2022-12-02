import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Answer, Question, Survey, SurveyResponse } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  
  allquestions: Question[];
  allsurveys: Survey[];
  allsurveyresponses: SurveyResponse[];
  
  constructor(
    private router: Router,
    public question: Question,
    private dataSource: RestDataSource,
    public activeRoute: ActivatedRoute) { }

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

  viewReport(id: number): void {
    alert("Coming soon...");
  }

}
