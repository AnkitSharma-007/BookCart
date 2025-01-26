import { AsyncPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatBadge } from "@angular/material/badge";
import { MatAnchor, MatButton, MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, map } from "rxjs";
import { UserType } from "src/app/models/usertype";
import { logout } from "src/app/state/actions/auth.actions";
import {
  selectAuthenticatedUser,
  selectIsAuthenticated,
} from "src/app/state/selectors/auth.selectors";
import { selectCarttemsCount } from "src/app/state/selectors/cart.selectors";
import { selectWishlistItemsCount } from "src/app/state/selectors/wishlist.selectors";
import { SearchComponent } from "../search/search.component";

@Component({
    selector: "app-nav-bar",
    templateUrl: "./nav-bar.component.html",
    styleUrls: ["./nav-bar.component.scss"],
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
    ]
})
export class NavBarComponent {
  private readonly store = inject(Store);

  userType: UserType;

  userState$ = combineLatest([
    this.store.select(selectIsAuthenticated),
    this.store.select(selectAuthenticatedUser),
    this.store.select(selectWishlistItemsCount),
    this.store.select(selectCarttemsCount),
  ]).pipe(
    map(([isAuthenticated, user, wishlistItemcount, cartItemCount]) => {
      return {
        isAuthenticated,
        user,
        wishlistItemcount,
        cartItemCount,
      };
    })
  );

  logout() {
    this.store.dispatch(logout());
  }
}
