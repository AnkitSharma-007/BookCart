import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { CartService } from "src/app/services/cart.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { setAuthState } from "../actions/auth.actions";
import {
  addToCart,
  addToCartFailure,
  addToCartSuccess,
  clearCart,
  clearCartFailure,
  clearCartSuccess,
  loadCart,
  loadCartFailure,
  loadCartSuccess,
  reduceCartQuantity,
  reduceCartQuantityFailure,
  reduceCartQuantitySuccess,
  removeCartItem,
  removeCartItemFailure,
  removeCartItemSuccess,
} from "../actions/cart.actions";
import { selectCurrentUserId } from "../selectors/auth.selectors";

@Injectable()
export class CartEffects {
  private readonly actions$ = inject(Actions);
  private readonly cartService = inject(CartService);
  private readonly store = inject(Store);
  private readonly snackbarService = inject(SnackbarService);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCart, setAuthState),
      concatLatestFrom(() => this.store.select(selectCurrentUserId)),
      switchMap(([, currentUserId]) => {
        if (currentUserId) {
          return this.cartService.getCartItems(Number(currentUserId)).pipe(
            map((shoppingCart) => loadCartSuccess({ shoppingCart })),
            catchError((error) => of(loadCartFailure({ errorMessage: error })))
          );
        }
        return of(loadCartFailure({ errorMessage: "User not found" }));
      })
    )
  );

  addToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      concatLatestFrom(() => this.store.select(selectCurrentUserId)),
      switchMap(([action, currentUserId]) => {
        if (currentUserId) {
          return this.cartService
            .addBookToCart(Number(currentUserId), action.bookId)
            .pipe(
              map((shoppingCart) => addToCartSuccess({ shoppingCart })),
              tap(() => {
                this.snackbarService.showSnackBar("One Item added to cart");
              }),
              catchError((error) =>
                of(addToCartFailure({ errorMessage: error }))
              )
            );
        }
        return of(addToCartFailure({ errorMessage: "User not found" }));
      })
    )
  );

  removeCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeCartItem),
      concatLatestFrom(() => this.store.select(selectCurrentUserId)),
      switchMap(([action, currentUserId]) => {
        if (currentUserId) {
          return this.cartService
            .removeBookFromCart(Number(currentUserId), action.bookId)
            .pipe(
              map((shoppingCart) => removeCartItemSuccess({ shoppingCart })),
              tap(() => {
                this.snackbarService.showSnackBar("Book removed from cart");
              }),
              catchError((error) =>
                of(removeCartItemFailure({ errorMessage: error }))
              )
            );
        }
        return of(removeCartItemFailure({ errorMessage: "User not found" }));
      })
    )
  );

  reduceCartQuantity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(reduceCartQuantity),
      concatLatestFrom(() => this.store.select(selectCurrentUserId)),
      switchMap(([action, currentUserId]) => {
        if (currentUserId) {
          return this.cartService
            .reduceCartQuantity(Number(currentUserId), action.bookId)
            .pipe(
              map((shoppingCart) =>
                reduceCartQuantitySuccess({ shoppingCart })
              ),
              tap(() => {
                this.snackbarService.showSnackBar("One item removed from cart");
              }),
              catchError((error) =>
                of(reduceCartQuantityFailure({ errorMessage: error }))
              )
            );
        }
        return of(
          reduceCartQuantityFailure({ errorMessage: "User not found" })
        );
      })
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(clearCart),
      concatLatestFrom(() => this.store.select(selectCurrentUserId)),
      switchMap(([, currentUserId]) => {
        if (currentUserId) {
          return this.cartService.clearCart(Number(currentUserId)).pipe(
            map(() => clearCartSuccess()),
            tap(() => {
              this.snackbarService.showSnackBar("Cart cleared");
            }),
            catchError((error) => of(clearCartFailure({ errorMessage: error })))
          );
        }
        return of(clearCartFailure({ errorMessage: "User not found" }));
      })
    )
  );
}
