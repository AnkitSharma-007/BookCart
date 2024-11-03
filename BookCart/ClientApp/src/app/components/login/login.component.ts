import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import {
  MatError,
  MatFormField,
  MatLabel,
  MatSuffix,
} from "@angular/material/form-field";
import { MatIcon } from "@angular/material/icon";
import { MatInput } from "@angular/material/input";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { combineLatest, ReplaySubject } from "rxjs";
import { switchMap, takeUntil } from "rxjs/operators";
import { User } from "src/app/models/user";
import { AuthenticationService } from "src/app/services/authentication.service";
import { CartService } from "src/app/services/cart.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { WishlistService } from "src/app/services/wishlist.service";

import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from "@angular/material/card";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatButton,
    RouterLink,
    MatCardSubtitle,
    MatError,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatIcon,
    MatSuffix,
    MatCardActions,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly authenticationService = inject(AuthenticationService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly wishlistService = inject(WishlistService);

  showPassword = true;
  userId;
  private destroyed$ = new ReplaySubject<void>(1);

  loginForm = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  protected get loginFormControl() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.subscriptionService.userData$
      .asObservable()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: User) => {
        this.userId = data.userId;
      });
  }

  login() {
    if (this.loginForm.valid) {
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
          takeUntil(this.destroyed$)
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
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
