import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyRepository } from 'src/app/model/survey.repository';
import { Question, Survey, SurveyResponse } from '../../model/survey.model';
import { DatePipe } from '@angular/common'
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Date } from 'mongoose';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrls: ['./create-survey.component.css'],
  providers: [DatePipe]
})
export class CreateSurveyComponent implements OnInit {

  allSurveyQuestions: Survey[];
  allquestions: Question[];
  startDate: any;
  endDate: any;
  surveytitle: String;
  editing = false;
  survey: Survey;


  constructor(    
    private repository: SurveyRepository,
    private router: Router,
    public question: Question,
    public datepipe: DatePipe,
    private dataSource: RestDataSource,
    activeRoute: ActivatedRoute
    )
     { 
     
      this.dataSource.getSurveyQuestions().subscribe(data => {
        this.allSurveyQuestions = data;

        this.editing = activeRoute.snapshot.params.mode === 'edit';
        if (this.editing)
        {
          debugger
          this.survey = this.allSurveyQuestions.find(q => q._id === activeRoute.snapshot.params.id);
          console.log(this.survey);
    
          this.surveytitle = this.survey.title;

          const datePipe = new DatePipe('en-US');

          this.startDate = datePipe.transform(this.survey.startdate.toString(), 'yyyy-MM-dd');
          this.endDate = datePipe.transform(this.survey.enddate.toString(), 'yyyy-MM-dd');
          // this.allquestions = this.survey.questions;

debugger
          // this.allquestions = this.survey.title;
          // this.surveytitle = this.survey.title;
          // let choices: Array<String> = this.survey.choices;
    
        
          // this.questionUI.choice1 = choices[0];
          // this.questionUI.choice2 = choices[1];
          // this.questionUI.choice3 = choices[2];
          // this.questionUI.choice4 = choices[3];
    
            debugger
          // Object.assign(this.question, repository.get(activeRoute.snapshot.params.id));
        }

      });
     }

  ngOnInit(): void {
    // this.allquestions = this.getAllQuestions;

    this.dataSource.getAllQuestions().subscribe(data => {
      this.allquestions = data;
    });
    this.allquestions.forEach(x => x.checked = false);
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
    if(confirm("Are you sure you want to create survey?")) {
      // //Adding question
      // let sampleQuestion: Question = {
      //   qnumber: 2,
      //   qtype: "mcq",
      //   qtext: "Which product you purchased 2?",
      //   choices: ["TV2","Fridge2"]
      // };

      // this.repository.saveQuestion(sampleQuestion).subscribe(order => {
      //  debugger
      // });

      //  //Adding survey


      //Adding survey - dynamic
      let selectedQuestionNumbers:Number[] = []; 

      let selectedQuestions = this.allquestions.filter( x=> x.checked == true);
      for (let i = 0; i < selectedQuestions.length; i++){
          selectedQuestionNumbers.push(selectedQuestions[i].qnumber);
      }

       let sampleSurvey: Survey = {
        _id: "0",
        title: this.surveytitle,
        // expires:  "2022-11-30",
        startdate:  this.datepipe.transform(this.startDate, 'yyyy-MM-dd'),
        enddate:  this.datepipe.transform(this.endDate, 'yyyy-MM-dd'),
        questions: selectedQuestionNumbers
      };

      this.repository.saveSurvey(sampleSurvey);
      this.router.navigateByUrl('/admin/main/all-surveys');
      // .subscribe(order => {
      //   this.router.navigateByUrl('/admin/main/all-surveys');
      // });

      //end of adding survey - dynamic code

      //Adding survey response
      
    //   let date = new Date(2022);
    //   let sampleSurveyResponse: SurveyResponse = {
    //    surveyId: "6370742a427f881f0f24c57c",
    //    answers: [
    //     {
    //       qnumber: 101123,
    //       answer: "TV"
    //     },
    //     {
    //       qnumber: 101123,
    //       answer: "TV"
    //     }
    //    ]
    //  };
    //  debugger
    //  this.repository.saveSurveyResponse(sampleSurveyResponse).subscribe(order => {
    //   debugger
    //  });

    }    
  }

  cancel(): void {
    this.router.navigateByUrl('/admin/main/all-surveys');
  }

}
