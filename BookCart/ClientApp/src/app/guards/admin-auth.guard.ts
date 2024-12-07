import { inject, Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { map, Observable } from "rxjs";
import { selectAuthenticatedUser } from "../state/selectors/auth.selectors";

@Injectable({
  providedIn: "root",
})
export class AdminAuthGuard {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select(selectAuthenticatedUser).pipe(
      map((user) => {
        if (user?.userTypeName == "Admin") {
          return true;
        }
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: state.url },
        });
        return false;
      })
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.canActivate(route, state);
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const url = `/${route.path}`;

    return this.store.select(selectAuthenticatedUser).pipe(
      map((user) => {
        if (user?.userTypeName == "Admin") {
          return true;
        }
        this.router.navigate(["/login"], {
          queryParams: { returnUrl: url },
        });
        return false;
      })
    );
  }
}
