export class Survey
{
  constructor(
    public qnumber: Number,
    public type: String,
    public text: String,
    public choices: String[]
  ){}

  public toString(){
    return `Survey
    ------------------------------
    Name: ${this.qnumber}
    type: ${this.type}
    text: ${this.text}
    choices: ${this.choices}
    `
  }
}
