import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
// import { AdminComponent } from './admin.component';
import { SurveyComponent } from '../survey/survey.component';
import { CreateQuestionComponent } from '../survey/create-question/create-question.component';
import { CreateSurveyComponent } from '../survey/create-survey/create-survey.component';
import { RespondSurveyComponent } from '../survey/respond-survey/respond-survey.component';
import { AdminComponent } from './admin.component';
import { RegisterComponent } from './register/register.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import { AllSurveysComponent } from './all-surveys/all-surveys.component';
import { ReportsComponent } from './reports/reports.component';
// import { OrderTableComponent } from './order-table/order-table.component';
// import { BookEditorComponent } from './book-editor/book-editor.component';
// import { BookTableComponent } from './book-table/book-table.component';

const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: AdminComponent, canActivate: [AuthGuard],
   children: [
    //   { path: 'books/:mode/:id', component: BookEditorComponent, data: {title: 'Edit Book'}, canActivate: [AuthGuard]},
    //   { path: 'books/:mode', component: BookEditorComponent, data: {title: 'Add Book'}, canActivate: [AuthGuard]},
    
  { path: 'all-surveys', component: AllSurveysComponent, data: {title: 'All Surveys'}},
  { path: 'all-questions', component: QuestionsListComponent, data: {title: 'All Questions'}},

  { path: 'create-question', component: CreateQuestionComponent, data: { title: 'CreateQuestion', canActivate: [AuthGuard] },},
  { path: 'create-survey', component: CreateSurveyComponent, data: { title: 'CreateSurvey' }, canActivate: [AuthGuard]},
  { path: 'reports', component: ReportsComponent, data: { title: 'Reports' }, canActivate: [AuthGuard]},

      { path: '**', redirectTo: 'survey-list' }]
  },
  { path: '**', redirectTo: 'auth' },
]);

@NgModule({
  imports: [CommonModule, FormsModule, routing],
  providers: [AuthGuard],
  declarations: [AuthComponent, AdminComponent, RegisterComponent, QuestionsListComponent, AllSurveysComponent, ReportsComponent]//, OrderTableComponent, BookEditorComponent, BookTableComponent]
})
export class AdminModule {}
