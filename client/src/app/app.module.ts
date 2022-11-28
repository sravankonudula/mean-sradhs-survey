import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookStoreModule } from './book-store/book-store.module';
import { PagesModule } from './pages/pages.module';
import { SurveyComponent } from './survey/survey.component';
import { JwtModule, JwtHelperService, JwtInterceptor   } from '@auth0/angular-jwt';
import { CreateSurveyComponent } from './survey/create-survey/create-survey.component';
import { CreateQuestionComponent } from './survey/create-question/create-question.component';
import { RespondSurveyComponent } from './survey/respond-survey/respond-survey.component';
import { FormsModule } from '@angular/forms';
import { ReportsComponent } from './survey/reports/reports.component';

export function jwtTokenGetter(): string
{
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    CreateSurveyComponent,
    CreateQuestionComponent,
    RespondSurveyComponent,
    ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BookStoreModule,
    PagesModule,
    FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [SurveyComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


