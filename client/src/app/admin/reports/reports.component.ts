import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { RestDataSource } from 'src/app/model/rest.datasource';
import { Answer, Question, Survey, SurveyResponse } from 'src/app/model/survey.model';
import { SurveyRepository } from 'src/app/model/survey.repository';
import * as fs from 'file-saver';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  
  allquestions: Question[];
  allsurveys: Survey[];
  allsurveyresponses: SurveyResponse[];
  
  constructor(
    private router: Router,
    public question: Question,
    private dataSource: RestDataSource,
    public activeRoute: ActivatedRoute) { }

ngOnInit(): void {
    this.dataSource.getAllQuestions().subscribe(data => {
      this.allquestions = data;
      this.allquestions.forEach(x => x.checked = false);

      this.dataSource.getSurveyQuestions().subscribe(data => {
        this.allsurveys = data;

        this.dataSource.getAllResponses().subscribe(data => {
          this.allsurveyresponses = data;
        });

      });

    });
  }

  viewReport(id: number): void {
    this.router.navigateByUrl('admin/main/view-reports/'+id);
  }

  async downloadReport(id: string) {

    let curSurvey =  this.allsurveys.find(s => s._id === id);

    var cursurveyQuestions = this.allquestions.filter(q => curSurvey.questions.includes(q.qnumber)).map(q => q.qtext);

    var curSurveyResponses = this.allsurveyresponses.filter(s => s.surveyId === id).map(r => r.answers);

    


    var responses: any[] = [];
    curSurveyResponses.forEach(r => {
      var resp: String[] = [];
      r.forEach(ra => resp.push(ra.answer));
      responses.push(resp);
    });
    debugger

    // Excel Title, Header, Data
      const title = curSurvey.title;
      const header = cursurveyQuestions;
    //   const data = [
    //   [2019, 1, '50', '20', '25', '20'],
    //   [2019, 2, '80', '20', '25', '20'],
    //   [2019, 3, '120', '20', '25', '20'],  
    //   [2019, 4, '75', '20', '25', '20'],  
    //   [2019, 5, '60', '20', '25', '20'],  
    //   [2019, 6, '80', '20', '25', '20'],  
    //   [2019, 7, '95', '20', '25', '20'],  
    //   [2019, 8, '55', '20', '25', '20'],  
    //   [2019, 9, '45', '20', '25', '20'],  
    //   [2019, 10, '80', '20', '25', '20'],  
    //   [2019, 11, '90', '20', '25', '20'],  
    //   [2019, 12, '110', '20', '25', '20'],      
    // ];

    const data = responses;

      // Create workbook and worksheet
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('Survey');


  // Add Row and formatting
      const titleRow = worksheet.addRow([title]);
      titleRow.font = { name: 'Corbel', family: 4, size: 16, underline: 'double', bold: true };
      worksheet.addRow([]);

      worksheet.mergeCells('A1:D2');


  // Blank Row
      worksheet.addRow([]);

  // Add Header Row
      const headerRow = worksheet.addRow(header);

  // Cell Style : Fill and Border
      headerRow.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' }
    };
    cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
  });

  // Add Data and Conditional Formatting
      data.forEach(d => {
    const row = worksheet.addRow(d);
    const qty = row.getCell(5);
    // let color = 'FF99FF99';
    // if (+qty.value < 500) {
    //   color = 'FF9999';
    // }

    // qty.fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: color }
    // };
  }

  );

      worksheet.getColumn(3).width = 30;
      worksheet.getColumn(4).width = 30;
      worksheet.addRow([]);

  // Generate Excel File with given name
      workbook.xlsx.writeBuffer().then((data: any) => {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, curSurvey.title+'.xlsx');
    });

  }

}
