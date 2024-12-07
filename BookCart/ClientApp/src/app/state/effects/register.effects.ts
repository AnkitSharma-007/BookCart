import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { SnackbarService } from "src/app/services/snackbar.service";
import { UserService } from "src/app/services/user.service";
import {
  register,
  registerFailure,
  registerSuccess,
} from "../actions/auth.actions";

@Injectable()
export class RegisterEffects {
  private readonly actions$ = inject(Actions);
  private readonly userService = inject(UserService);
  private readonly snackbarService = inject(SnackbarService);
  private readonly router = inject(Router);

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      switchMap((action) =>
        this.userService.registerUser(action.userdetails).pipe(
          map(() => registerSuccess()),
          catchError((error: any) =>
            of(registerFailure({ errorMessage: new Error(error).message }))
          )
        )
      )
    )
  );

  handleRegisterSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerSuccess),
        tap(() => {
          this.snackbarService.showSnackBar("Registration successful");
          this.router.navigate(["/login"]);
        })
      ),
    { dispatch: false }
  );

  handleRegisterFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerFailure),
        tap((action) => {
          // Log the error and show a snackbar notification
          console.error(
            "Error occurred during user registration:",
            action.errorMessage
          );
          this.snackbarService.showSnackBar(
            "An error occurred. Please try again."
          );
        })
      ),
    { dispatch: false }
  );
}
