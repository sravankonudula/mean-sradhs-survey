import { Injectable } from "@angular/core";

@Injectable()

export class Survey
{
  public title: String;
  public expires: String;
  public questions: Number[];

  // constructor(
  //   public qnumber: Number,
  //   public type: String,
  //   public text: String,
  //   public choices: String[]
  // ){}

  // public toString(){
  //   return `Survey
  //   ------------------------------
  //   Name: ${this.qnumber}
  //   type: ${this.type}
  //   text: ${this.text}
  //   choices: ${this.choices}
  //   `
  // }
}

@Injectable()
export class Question{
  public qnumber: Number;
  public qtype: String;
  public qtext: String;
  public choices: String[];
}

@Injectable()
export class SurveyResponse{
  public surveyId: String;
  public answers: [
    {
      qnumber: Number,
      answer: String
    }
  ];
}

export class QuestionUI{
  public qtext: String;
  public choice1: String;
  public choice2: String;
  public choice3: String;
  public choice4: String;
}
