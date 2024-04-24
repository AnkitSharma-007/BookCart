import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/models/user";
import { switchMap, takeUntil } from "rxjs/operators";
import { WishlistService } from "src/app/services/wishlist.service";
import { Subject } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  showPassword = true;
  userId;
  private unsubscribe$ = new Subject<void>();

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private authenticationService: AuthenticationService,
    private subscriptionService: SubscriptionService,
    private wishlistService: WishlistService
  ) {}

  protected get loginFormControl() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.subscriptionService.userData$
      .asObservable()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: User) => {
        this.userId = data.userId;
      });
  }

  login() {
    if (this.loginForm.valid) {
      // This logic needs refactoring as the UI is not smooth after login.
      this.authenticationService
        .login(this.loginForm.value)
        .pipe(
          switchMap(() => {
            return this.cartService.setCart(
              this.authenticationService.oldUserId,
              this.userId
            );
          }),
          switchMap((cartItemcount) => {
            this.subscriptionService.cartItemcount$.next(cartItemcount);
            return this.wishlistService.getWishlistItems(this.userId);
          }),
          switchMap(() => this.route.queryParams),
          takeUntil(this.unsubscribe$)
        )
        .subscribe({
          next: (params) => {
            const returnUrl = params["returnUrl"] || "/";
            this.router.navigate([returnUrl]);
          },
          error: (error) => {
            console.error("Error occurred while login : ", error);
            this.loginForm.reset();
            this.loginForm.setErrors({
              invalidLogin: true,
            });
          },
        });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
