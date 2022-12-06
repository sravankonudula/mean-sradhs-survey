import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Question, QuestionUI } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  allquestions: Question[];
  editing = false;
  questionUI: QuestionUI = new QuestionUI();
  question: Question = new Question();
  curQNumber: Number;


  constructor(private repository: SurveyRepository,
    private router: Router,
    private dataSource: RestDataSource,
    activeRoute: ActivatedRoute)
{
  this.dataSource.getAllQuestions().subscribe(data => {
    this.allquestions = data;

    this.editing = activeRoute.snapshot.params.mode === 'edit';
    if (this.editing)
    {
      debugger
      this.question = this.allquestions.find(q => q._id === activeRoute.snapshot.params.id);
      console.log(this.question);

      this.questionUI.qtext = this.question.qtext;
      let choices: Array<String> = this.question.choices;

    
      this.questionUI.choice1 = choices[0];
      this.questionUI.choice2 = choices[1];
      this.questionUI.choice3 = choices[2];
      this.questionUI.choice4 = choices[3];

        debugger
      // Object.assign(this.question, repository.get(activeRoute.snapshot.params.id));
    }
    
  });
  
}
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
    this.repository.saveQuestion(this.question);
    this.router.navigateByUrl('/admin/main/all-questions');

    // if (this.editing){
    //   this.repository.updateQuestion(this.question).subscribe(question => {
    //     debugger
    //     this.router.navigateByUrl('/admin/main/all-questions');
    //   });
    // }
    // else{
    //   this.repository.saveQuestion(this.question).subscribe(question => {
    //     debugger
    //     this.router.navigateByUrl('/admin/main/all-questions');
    //   });
    // }
  }

  cancel(): void {
    this.router.navigateByUrl('/admin/main/all-questions');
  }

}
