import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Answer, Question, Survey, SurveyResponse } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-respond-survey',
  templateUrl: './respond-survey.component.html',
  styleUrls: ['./respond-survey.component.css']
})
export class RespondSurveyComponent implements OnInit {


  
  allquestions: Question[];
  cursurveyquestions: Question[]=[];
  cursurveyanswers: Answer[]=[];

  allsurveys: Survey[];
  curSurvey: Survey;
  startDate: Date;
  endDate: Date;
  surveytitle: string;


  constructor(    
    private repository: SurveyRepository,
    private router: Router,
    public question: Question,
    private dataSource: RestDataSource,
    public activeRoute: ActivatedRoute
    )
     { }

  ngOnInit(): void {
    // this.allquestions = this.getAllQuestions;

    this.dataSource.getAllQuestions().subscribe(data => {
      this.allquestions = data;
      this.allquestions.forEach(x => x.checked = false);

      this.dataSource.getSurveyQuestions().subscribe(data => {
        this.allsurveys = data;
        this.buildFormData();
      });

    });
    
  }

  buildFormData(){
    debugger
    this.curSurvey = this.allsurveys.find(x => x._id === this.activeRoute.snapshot.params.id);

    for (let i = 0; i < this.curSurvey.questions.length; i++){
      this.cursurveyquestions.push(this.allquestions.find(q => q.qnumber===this.curSurvey.questions[i]));
    }
  }


  get surveyQuestions(): Survey {

    var result =  this.repository
    .getSurveyQuestions();

    // var result2 = result.filter(x=> x._id == "6371504b69ed3b157cb659b8")[0];

    // console.log(result2);

    return result[3];

    // return this.repository
    //   .getSurveyQuestions()[0];
  }

  get getAllQuestions(): Question[] {
   let questions = this.repository
      .getAllQuestions();
      
      return questions;
  }

  submitSurvey(): void {
    if(confirm("Are you sure to submit survey?")) {
      //Adding survey response
      debugger
      let sampleSurveyResponse: SurveyResponse = {
       surveyId: this.curSurvey._id,
       answers: this.cursurveyanswers
      //  answers: [
      //   {
      //     qnumber: 101123,
      //     answer: "TV"
      //   },
      //   {
      //     qnumber: 101123,
      //     answer: "TV"
      //   }
      //  ]
     };
     debugger
     this.repository.saveSurveyResponse(sampleSurveyResponse).subscribe(order => {
      debugger
     });

      this.router.navigateByUrl('/survey-list');
    }    
  }

  cancel(): void {
    this.router.navigateByUrl('/survey-list');
  }

  onChange(e) {
    debugger
    console.log(e.target.value);
    
    let filteredAnswer = this.cursurveyanswers.find(a => a.qnumber == e.target.name);
    if(filteredAnswer !== undefined){
      const index = this.cursurveyanswers.indexOf(filteredAnswer);
      if (index > -1) {
        this.cursurveyanswers.splice(index, 1);
     }
    }

    let answer: Answer = new Answer();
    answer.qnumber = e.target.name;
    answer.answer = e.target.value;

    this.cursurveyanswers.push(answer);
 }

}
