import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookStoreModule } from './book-store/book-store.module';
import { PagesModule } from './pages/pages.module';
import { SurveyComponent } from './survey/survey.component';
import { JwtModule, JwtHelperService, JwtInterceptor   } from '@auth0/angular-jwt';
import { CreateSurveyComponent } from './survey/create-survey/create-survey.component';

export function jwtTokenGetter(): string
{
  return localStorage.getItem('id_token');
}

@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    CreateSurveyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BookStoreModule,
    PagesModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


