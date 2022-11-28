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
import { ReportsComponent } from '../survey/reports/reports.component';
// import { OrderTableComponent } from './order-table/order-table.component';
// import { BookEditorComponent } from './book-editor/book-editor.component';
// import { BookTableComponent } from './book-table/book-table.component';

const routing = RouterModule.forChild([
  { path: 'auth', component: AuthComponent },
  { path: 'main', component: AdminComponent, canActivate: [AuthGuard],
   children: [
    //   { path: 'books/:mode/:id', component: BookEditorComponent, data: {title: 'Edit Book'}, canActivate: [AuthGuard]},
    //   { path: 'books/:mode', component: BookEditorComponent, data: {title: 'Add Book'}, canActivate: [AuthGuard]},
    //   { path: 'survey-list', component: SurveyComponent, data: {title: 'Book Table'}, canActivate: [AuthGuard]},
    //   { path: 'orders', component: OrderTableComponent, data: {title: 'Order Table'}, canActivate: [AuthGuard]},

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
  declarations: [AuthComponent, AdminComponent]//, OrderTableComponent, BookEditorComponent, BookTableComponent]
})
export class AdminModule {}
