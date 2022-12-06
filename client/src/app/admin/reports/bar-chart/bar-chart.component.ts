import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Answer, Question, Survey, SurveyResponse } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

import { Chart } from "chart.js";
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public chart: Chart;
  allquestions: Question[];
  allsurveys: Survey[];
  allsurveyresponses: SurveyResponse[];
  ques:String[];
  
  constructor(
    private router: Router,
    public question: Question,
    private dataSource: RestDataSource,
    public activeRoute: ActivatedRoute) { }

  
  
  buildFormData(){
      for (let i = 0; i < this.allsurveyresponses.length; i++){
        this.allsurveyresponses.push(this.allsurveyresponses.find(q => q.surveyId==='2'));
      }
      console.log(this.allsurveyresponses)
    }

  ngOnInit() {
    // for(let surveys of this.allsurveyresponses){
    //   this.ques.push(surveys.surveyId)
    // }
    // console.log(this.ques)
    // this.buildFormData();
    this.chart = new Chart("canvas", {
      type: "bar",
      data: {
        labels: ["TV", "Laptop", "Mobile", "Tablet"],
        datasets: [
          {
            label: "# of Votes",
            data: [10,11,1,5],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              // "rgba(153, 102, 255, 0.2)",
              // "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              // "rgba(153, 102, 255, 1)",
              // "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }

}
