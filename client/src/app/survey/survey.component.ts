import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {

  constructor(    private router: Router
    ) { }

  ngOnInit(): void {
  }

  createSurvey(): void {
    this.router.navigateByUrl('/create-survey');
  }
  
}
