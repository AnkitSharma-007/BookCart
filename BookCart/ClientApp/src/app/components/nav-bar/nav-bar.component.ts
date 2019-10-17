import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/usertype';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SubscriptionService } from 'src/app/services/subscription.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnDestroy {

  cartItemCount: number;
  userId;
  userDataSubscription: any;
  userData = new User();
  userType = UserType;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    public overlayContainer: OverlayContainer,
    private subscriptionService: SubscriptionService) {

    this.userDataSubscription = this.subscriptionService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });

    this.userId = localStorage.getItem('userId');

    this.userService.getCartItemCount(this.userId).subscribe((data: number) => {
      this.cartItemCount = data;
    });

    this.userService.cartItemcount$.subscribe(data => {
      this.cartItemCount = data;
    });
  }

  ngOnDestroy() {
    if (this.userDataSubscription) {
      this.userDataSubscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
