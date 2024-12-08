import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { SnackbarService } from "src/app/services/snackbar.service";
import { WishlistService } from "src/app/services/wishlist.service";
import { setAuthState } from "../actions/auth.actions";
import {
  clearWishlist,
  clearWishlistFailure,
  clearWishlistSuccess,
  loadWishlist,
  loadWishlistFailure,
  loadWishlistSuccess,
  toggleWishlistItem,
  toggleWishlistItemFailure,
  toggleWishlistItemSuccess,
} from "../actions/wishlist.actions";
import { selectAuthenticatedUser } from "../selectors/auth.selectors";

@Injectable()
export class WishlistEffects {
  private readonly actions$ = inject(Actions);
  private readonly wishlistService = inject(WishlistService);
  private readonly store = inject(Store);
  private readonly snackbarService = inject(SnackbarService);

  loadWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWishlist, setAuthState),
      concatLatestFrom(() => this.store.select(selectAuthenticatedUser)),
      switchMap(([, authenticatedUser]) => {
        if (authenticatedUser) {
          return this.wishlistService
            .getWishlistItems(authenticatedUser.userId)
            .pipe(
              map((wishlist) => loadWishlistSuccess({ wishlist })),
              catchError((error) =>
                of(loadWishlistFailure({ errorMessage: error }))
              )
            );
        }
        return of(loadWishlistFailure({ errorMessage: "User not found" }));
      })
    )
  );

  toggleWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(toggleWishlistItem),
      concatLatestFrom(() => this.store.select(selectAuthenticatedUser)),
      switchMap(([action, authenticatedUser]) => {
        if (authenticatedUser) {
          return this.wishlistService
            .toggleWishlistItem(authenticatedUser.userId, action.bookId)
            .pipe(
              map((wishlist) => toggleWishlistItemSuccess({ wishlist })),
              tap(() => {
                if (action.isAdd) {
                  this.snackbarService.showSnackBar("Added to Wishlist!!!");
                } else {
                  this.snackbarService.showSnackBar("Removed from Wishlist!!!");
                }
              }),
              catchError((error) =>
                of(toggleWishlistItemFailure({ errorMessage: error }))
              )
            );
        }
        return of(
          toggleWishlistItemFailure({ errorMessage: "User not found" })
        );
      })
    )
  );

  clearWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearWishlist),
      concatLatestFrom(() => this.store.select(selectAuthenticatedUser)),
      switchMap(([, authenticatedUser]) => {
        if (authenticatedUser) {
          return this.wishlistService
            .clearWishlist(authenticatedUser.userId)
            .pipe(
              map(() => clearWishlistSuccess()),
              tap(() =>
                this.snackbarService.showSnackBar("Wishlist cleared!!!")
              ),
              catchError((error) => {
                console.error(
                  "Error ocurred while removing items from the Wishlist : ",
                  error
                );
                return of(clearWishlistFailure({ errorMessage: error }));
              })
            );
        }
        return of(clearWishlistFailure({ errorMessage: "User not found" }));
      })
    )
  );
}
