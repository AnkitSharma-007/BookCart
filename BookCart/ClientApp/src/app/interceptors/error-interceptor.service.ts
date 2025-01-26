import {
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { logout } from "../state/actions/auth.actions";

export const ErrorInterceptorService: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const store = inject(Store);
  const router = inject(Router);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        store.dispatch(logout());
        if (!request.url.includes("login")) {
          location.reload();
        }
      } else if (error.status === 404) {
        router.navigate(["not-found"]);
      }
      return throwError(() => error.message);
    })
  );
};
