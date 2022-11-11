import { NgModule } from '@angular/core';
import { BookRepository} from './book.repository';
import { StaticDataSource } from './static.datasource';
import { Cart } from './cart.model';
import { RestDataSource } from './rest.datasource';
import { HttpClientModule } from '@angular/common/http';
import { SurveyRepository } from './survey.repository';

@NgModule({
  imports: [HttpClientModule],
  providers: [BookRepository, SurveyRepository, StaticDataSource, Cart,
  {provide: StaticDataSource, useClass: RestDataSource},
  RestDataSource]
})
export class ModelModule {}
