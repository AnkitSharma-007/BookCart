import { inject, Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { selectIsAuthenticated } from "../state/selectors/auth.selectors";

@Injectable({
  providedIn: "root",
})
export class AuthGuard {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (localStorage.getItem("authToken")) {
      return true;
    }

    return this.store.select(selectIsAuthenticated).pipe(
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return true;
        }
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }
}
