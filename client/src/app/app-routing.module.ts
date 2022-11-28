import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ProductsComponent } from './pages/products/products.component';
import { ServicesComponent } from './pages/services/services.component';
import { BookStoreComponent } from './book-store/book-store.component';
import { ContactComponent } from './pages/contact/contact.component';
import { CartDetailComponent } from './book-store/cart-detail/cart-detail.component';
import { CheckoutComponent } from './book-store/checkout/checkout.component';
import { StoreFirstGuard } from './book-store/guards/storeFirst.guards';
import { SurveyComponent } from './survey/survey.component';
import { CreateSurveyComponent } from './survey/create-survey/create-survey.component';
import { CreateQuestionComponent } from './survey/create-question/create-question.component';
import { RespondSurveyComponent } from './survey/respond-survey/respond-survey.component';

const routes: Routes = [

  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
 {path: 'login', data: {title: 'Login'}, redirectTo: '/admin/auth', pathMatch: 'full'},

 {path: 'about', component: AboutComponent, data: {title: 'About'}},
 {path: 'products', component: ProductsComponent, data: {title: 'Products'}},
 {path: 'services', component: ServicesComponent, data: {title: 'Services'}},
 {path: 'contact', component: ContactComponent, data: {title: 'Contact'}},

 {path: 'survey-list', component: SurveyComponent, data: { title: 'Survey List'}  },
 {path: 'cart', component: CartDetailComponent, data: { title: 'Shopping Cart'}},
 {path: 'checkout', component: CheckoutComponent, data: { title: 'Checkout'}},
 {path: 'respond-survey/:id', component: RespondSurveyComponent, data: { title: 'SurveyResponse' }}, 
 
 {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
 
 {path: '', redirectTo: '/home', pathMatch: 'full'},
 {path: '**', redirectTo: '/home', pathMatch: 'full'}

 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [StoreFirstGuard],
})
export class AppRoutingModule {}
