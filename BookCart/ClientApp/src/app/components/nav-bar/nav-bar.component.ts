import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/usertype';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { SubscriptionService } from 'src/app/services/subscription.service';
import { Observable } from 'rxjs';
import { WishlistService } from 'src/app/services/wishlist.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  userId;
  userDataSubscription: any;
  userData = new User();
  userType = UserType;
  wishListCount$: Observable<number>;
  cartItemCount$: Observable<number>;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private wishlistService: WishlistService) {

    this.userId = localStorage.getItem('userId');
    this.wishlistService.getWishlistItems(this.userId).subscribe();
    this.userService.getCartItemCount(this.userId).subscribe((data: number) => {
      this.subscriptionService.cartItemcount$.next(data);
    });
  }

  ngOnInit() {

    this.userDataSubscription = this.subscriptionService.userData.asObservable().subscribe(data => {
      this.userData = data;
    });

    this.cartItemCount$ = this.subscriptionService.cartItemcount$;
    this.wishListCount$ = this.subscriptionService.wishlistItemcount$;
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
