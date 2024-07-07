import { inject } from "@angular/core";
import { Router } from "@angular/router";
import {
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpInterceptorFn,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "../services/authentication.service";
import { throwError } from "rxjs";

export const ErrorInterceptorService: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (error.status === 401) {
        authService.logout();
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
