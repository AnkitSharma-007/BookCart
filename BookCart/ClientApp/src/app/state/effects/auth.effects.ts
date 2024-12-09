import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, combineLatest, map, of, switchMap, take, tap } from "rxjs";
import { User } from "src/app/models/user";
import { AuthenticationService } from "src/app/services/authentication.service";
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  setAuthState,
} from "../actions/auth.actions";
import { selectQueryParams } from "../selectors/router.selectors";
import { connect } from "http2";
import { loadCart } from "../actions/cart.actions";

@Injectable()
export class AuthEffects {
  private readonly actions$ = inject(Actions);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly router = inject(Router);
  private readonly store = inject(Store);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap((action) =>
        combineLatest([
          this.store.select(selectQueryParams),
          this.authenticationService.login(action.loginCredentials),
        ]).pipe(
          take(1),
          map(([queryParam, response]) => {
            localStorage.setItem("authToken", response?.token);
            this.router.navigate([queryParam["returnUrl"] ?? "/"]);
            return loginSuccess();
          }),
          catchError((error: any) =>
            of(loginFailure({ errorMessage: new Error(error).message }))
          )
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.clear();
          this.authenticationService.setTempUserId();
          this.router.navigate(["/login"]);
        })
      ),
    { dispatch: false }
  );

  handleLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      map(() => {
        const authToken = localStorage.getItem("authToken");
        if (authToken) {
          const userDetails = new User();
          const decodeUserDetails = JSON.parse(
            window.atob(authToken.split(".")[1])
          );
          userDetails.userId = decodeUserDetails.userId;
          userDetails.username = decodeUserDetails.name;
          userDetails.userTypeName = decodeUserDetails.sub;

          return setAuthState({
            user: userDetails,
          });
        } else {
          this.authenticationService.setTempUserId();
          return loginFailure({ errorMessage: "Invalid token" });
        }
      })
    )
  );
}
