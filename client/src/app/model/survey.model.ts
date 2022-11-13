export class Survey
{

  public _id: String;
  public title: String;
  public questions: Question[];

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

export class Question{
  public qnumber: Number;
  public type: String;
  public text: String;
  public choices: String[];
}
