import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Question, QuestionUI } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  editing = false;
  questionUI: QuestionUI = new QuestionUI();
  question: Question = new Question();
  curQNumber: Number;


  constructor( private repository: SurveyRepository,
    private router: Router) { }

  ngOnInit(): void {
    var result =  this.repository.getAllQuestions();
    this.curQNumber = result.length+1;
    console.log("Number of questions: "+ this.curQNumber);
  }

  save(form: NgForm): void
  {
    debugger  
    this.question.qtext = this.questionUI.qtext;
    this.question.qtype = "mcq";
    this.question.qnumber = this.curQNumber;
    let choices: Array<String> = [this.questionUI.choice1, 
                                  this.questionUI.choice2, 
                                  this.questionUI.choice3, 
                                  this.questionUI.choice4];

      // let sampleQuestion: Question = {
      //   qnumber: 2,
      //   qtype: "mcq",
      //   qtext: "Which product you purchased 2?",
      //   choices: ["TV2","Fridge2"]
      // };


    this.question.choices = choices;

    

    this.repository.saveQuestion(this.question).subscribe(question => {
      debugger
      this.router.navigateByUrl('/survey-list');
    });

  }

}
