import { AsyncPipe, NgTemplateOutlet } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatBadge } from "@angular/material/badge";
import { MatAnchor, MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { combineLatestWith, map } from "rxjs";
import { User } from "src/app/models/user";
import { UserType } from "src/app/models/usertype";
import { AuthenticationService } from "src/app/services/authentication.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { UserService } from "src/app/services/user.service";
import { WishlistService } from "src/app/services/wishlist.service";
import { SearchComponent } from "../search/search.component";

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
    AsyncPipe,
    NgTemplateOutlet,
  ],
})
export class NavBarComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthenticationService);
  private readonly userService = inject(UserService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly wishlistService = inject(WishlistService);

  userId = localStorage.getItem("userId");
  userType = UserType;
  userData$ = this.subscriptionService.userData$.asObservable();
  cartItemCount$ = this.subscriptionService.cartItemcount$.asObservable();
  getCartItemCount$ = this.userService.getCartItemCount(Number(this.userId));
  wishListCount$ = this.subscriptionService.wishlistItemcount$.asObservable();
  getWishlistItems$ = this.wishlistService.getWishlistItems(
    Number(this.userId)
  );

  vm$ = this.getCartItemCount$.pipe(
    combineLatestWith(
      this.userData$,
      this.cartItemCount$,
      this.wishListCount$,
      this.getWishlistItems$
    ),
    map(([, userData, cartItemCount, wishListCount]) => {
      let vm = new Vm();

      vm.userData = userData;
      vm.cartItemCount = cartItemCount;
      vm.wishListCount = wishListCount;

      return vm;
    })
  );

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}

class Vm {
  userData: User;
  cartItemCount: number;
  wishListCount: number;

  constructor() {
    this.userData = new User();
    this.cartItemCount = 0;
    this.wishListCount = 0;
  }
}
