import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "src/app/models/user";
import { UserType } from "src/app/models/usertype";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UserService } from "src/app/services/user.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { ReplaySubject, takeUntil } from "rxjs";
import { WishlistService } from "src/app/services/wishlist.service";
import { MatMenuTrigger, MatMenu, MatMenuItem } from "@angular/material/menu";
import { MatTooltip } from "@angular/material/tooltip";
import { MatBadge } from "@angular/material/badge";
import { AsyncPipe } from "@angular/common";
import { SearchComponent } from "../search/search.component";
import { MatIcon } from "@angular/material/icon";
import { MatButton, MatIconButton, MatAnchor } from "@angular/material/button";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";

@Component({
    selector: "app-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.scss"],
    standalone: true,
    imports: [
    MatToolbar,
    MatToolbarRow,
    MatButton,
    RouterLink,
    MatIcon,
    SearchComponent,
    MatIconButton,
    RouterLinkActive,
    MatBadge,
    MatTooltip,
    MatAnchor,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    AsyncPipe
],
})
export class NavBarComponent implements OnInit, OnDestroy {
  userId;
  userData = new User();
  userType = UserType;
  cartItemCount$ = this.subscriptionService.cartItemcount$;
  wishListCount$ = this.subscriptionService.wishlistItemcount$;

  private destroyed$ = new ReplaySubject<void>(1);

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService,
    private subscriptionService: SubscriptionService,
    private wishlistService: WishlistService
  ) {
    this.userId = localStorage.getItem("userId");
    this.wishlistService
      .getWishlistItems(this.userId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe();
    this.userService
      .getCartItemCount(this.userId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: number) => {
        this.subscriptionService.cartItemcount$.next(data);
      });
  }

  ngOnInit() {
    this.subscriptionService.userData$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data) => {
        this.userData = data;
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
