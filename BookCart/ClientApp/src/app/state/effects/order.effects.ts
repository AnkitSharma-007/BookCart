import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatLatestFrom } from "@ngrx/operators";
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { MyordersService } from "src/app/services/myorders.service";
import {
  loadOrders,
  loadOrdersFailure,
  loadOrdersSuccess,
} from "../actions/order.actions";
import { selectAuthenticatedUser } from "../selectors/auth.selectors";

@Injectable()
export class OrderEffects {
  private readonly actions$ = inject(Actions);
  private readonly myordersService = inject(MyordersService);
  private readonly store = inject(Store);

  loadOrders$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadOrders),
      concatLatestFrom(() => this.store.select(selectAuthenticatedUser)),
      switchMap(([, authenticatedUser]) => {
        if (authenticatedUser) {
          return this.myordersService
            .myOrderDetails(authenticatedUser.userId)
            .pipe(
              map((orders) => loadOrdersSuccess({ orders })),
              catchError((error) =>
                of(loadOrdersFailure({ errorMessage: error }))
              )
            );
        }
        return of(loadOrdersFailure({ errorMessage: "User not found" }));
      })
    )
  );
}
