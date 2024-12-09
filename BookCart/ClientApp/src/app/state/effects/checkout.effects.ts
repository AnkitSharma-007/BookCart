import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { catchError, delay, map, of, switchMap, tap } from "rxjs";
import { SnackbarService } from "src/app/services/snackbar.service";
import { CheckoutService } from "../../services/checkout.service";
import { clearCart } from "../actions/cart.actions";
import {
  placeOrder,
  placeOrderFailure,
  placeOrderSuccess,
} from "../actions/checkout.actions";
import { selectAuthenticatedUser } from "../selectors/auth.selectors";
import { selectCartItems } from "../selectors/cart.selectors";

@Injectable()
export class CheckoutEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly checkoutService = inject(CheckoutService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly router = inject(Router);

  placeOrder$ = createEffect(() =>
    this.actions$.pipe(
      ofType(placeOrder),
      concatLatestFrom(() => [
        this.store.select(selectAuthenticatedUser),
        this.store.select(selectCartItems),
      ]),
      switchMap(([action, authenticatedUser, cartItems]) =>
        this.checkoutService
          .placeOrder(authenticatedUser.userId, {
            orderDetails: cartItems,
            cartTotal: action.totalPrice,
          })
          .pipe(
            map(() => placeOrderSuccess()),
            catchError((error) =>
              of(placeOrderFailure({ errorMessage: error }))
            )
          )
      )
    )
  );

  handleSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(placeOrderSuccess),
        tap(() => {
          this.snackbarService.showSnackBar("Order placed successfully!!!");
          this.router.navigate(["/myorders"]);
          this.store.dispatch(clearCart());
        })
      ),
    { dispatch: false }
  );
}
