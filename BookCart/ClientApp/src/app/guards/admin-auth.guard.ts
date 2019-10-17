import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,
  Router, CanActivateChild, CanLoad, Route
} from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { SubscriptionService } from '../services/subscription.service';
import { UserType } from '../models/usertype';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate, CanActivateChild, CanLoad {

  userDataSubscription: any;
  userData = new User();

  constructor(private router: Router, private subscriptionService: SubscriptionService) {
    this.userDataSubscription = this.subscriptionService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.userData.userTypeId === UserType.admin) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `/${route.path}`;
    if (this.userData.userTypeId === UserType.admin) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
    return false;
  }
}
