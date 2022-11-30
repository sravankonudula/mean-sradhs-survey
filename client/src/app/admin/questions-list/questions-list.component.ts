import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Answer, Question, Survey } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {

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
    public activeRoute: ActivatedRoute) { }

ngOnInit(): void {
  this.dataSource.getAllQuestions().subscribe(data => {
    this.allquestions = data;
  });
}


deleteQuestion(id: number): void
  {
    alert("This will be implemented in next release...");
    // if (confirm('Are you sure?') && (id !== undefined))
    // {
    //   //this.repository.deleteBook(id);
    // }
    // else
    // {
    //   window.location.reload(); // refresh fix
    //   this.router.navigateByUrl('/admin/main/books');
    // }
  }

  addQuestion(): void
  {
    this.router.navigateByUrl('/admin/main/create-question');
  }

  editQuestion(id: number): void
  {
    alert("This will be implemented in next release...");
    //this.router.navigateByUrl('/admin/main/books/edit/' + id);
  }

}
