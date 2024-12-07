import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatBadge } from "@angular/material/badge";
import { MatAnchor, MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { combineLatest, combineLatestWith, map, Observable } from "rxjs";
import { User } from "src/app/models/user";
import { UserType } from "src/app/models/usertype";
import { AuthenticationService } from "src/app/services/authentication.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { UserService } from "src/app/services/user.service";
import { WishlistService } from "src/app/services/wishlist.service";
import { SearchComponent } from "../search/search.component";
import {
  selectAuthenticatedUser,
  selectIsAuthenticated,
} from "src/app/state/selectors/auth.selectors";
import { Store } from "@ngrx/store";
import { logout } from "src/app/state/actions/auth.actions";

@Component({
  selector: "app-nav-bar",
  templateUrl: "./nav-bar.component.html",
  styleUrls: ["./nav-bar.component.scss"],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  ],
})
export class NavBarComponent {
  private readonly userService = inject(UserService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly wishlistService = inject(WishlistService);
  private readonly store = inject(Store);

  userType: UserType;
  // userData$ = this.subscriptionService.userData$.asObservable();
  // cartItemCount$ = this.subscriptionService.cartItemcount$.asObservable();
  // getCartItemCount$ = this.userService.getCartItemCount(Number(this.userId));
  // wishListCount$ = this.subscriptionService.wishlistItemcount$.asObservable();
  // getWishlistItems$ = this.wishlistService.getWishlistItems(
  //   Number(this.userId)
  // );

  userState$ = combineLatest([
    this.store.select(selectIsAuthenticated),
    this.store.select(selectAuthenticatedUser),
  ]).pipe(
    map(([isAuthenticated, user]) => {
      return {
        isAuthenticated,
        user,
      };
    })
  );

  logout() {
    this.store.dispatch(logout());
  }
}
