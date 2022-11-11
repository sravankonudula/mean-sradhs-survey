import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { SurveyComponent } from 'src/app/survey/survey.component';
import { BookStoreComponent } from '../book-store.component';

@Injectable()
export class StoreFirstGuard {
  private firstNavigation = true;

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.firstNavigation) {
      this.firstNavigation = false;
      if (route.component !== SurveyComponent) {
        this.router.navigateByUrl('survey-list');
        return false;
      }
    }
    return true;
  }
}
