import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { Question, Survey, SurveyResponse } from '../../model/survey.model';
import { DatePipe } from '@angular/common'



@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
  providers: [DatePipe]
})
export class CreateSurveyComponent implements OnInit {

  constructor(    
    private repository: SurveyRepository,
    private router: Router,
    public question: Question,
    public datepipe: DatePipe
    )
     { }

  ngOnInit(): void {
    debugger
    let allquestions = this.getAllQuestions;
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
      debugger
      return questions;
  }

  submitSurvey(): void {
    if(confirm("Are you sure to delete?")) {
      
      //Adding question
      let sampleQuestion: Question = {
        qnumber: 2,
        qtype: "mcq",
        qtext: "Which product you purchased 2?",
        choices: ["TV2","Fridge2"]
      };

      this.repository.saveQuestion(sampleQuestion).subscribe(order => {
       debugger
      });

      //  //Adding survey
      //  let date = new Date(2022);
      //  let sampleSurvey: Survey = {
      //   title: "thirdsurvey",
      //   expires:  "2022-11-30",
      //   questions: [6,5]
      // };

      // this.repository.saveSurvey(sampleSurvey).subscribe(order => {
      //  debugger
      // });

    //   //Adding survey response
    //   let date = new Date(2022);
    //   let sampleSurveyResponse: SurveyResponse = {
    //    surveyId: "6370742a427f881f0f24c57c",
    //    answers: [
    //     {
    //       qnumber: 10,
    //       answer: "TV"
    //     }
    //    ]
    //  };

    //  this.repository.saveSurveyResponse(sampleSurveyResponse).subscribe(order => {
    //   debugger
    //  });


      this.router.navigateByUrl('/survey-list');
    }    
  }

  cancel(): void {
    this.router.navigateByUrl('/survey-list');
  }

  cl(name: string) {
    
  }

}
