import { CurrencyPipe } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatError, MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { Router, RouterLink } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { Order } from "src/app/models/order";
import { CartService } from "src/app/services/cart.service";
import { CheckoutService } from "src/app/services/checkout.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { SubscriptionService } from "src/app/services/subscription.service";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.scss"],
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatCardActions,
    MatButton,
    RouterLink,
    MatProgressSpinner,
    CurrencyPipe,
  ],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly cartService = inject(CartService);
  private readonly checkOutService = inject(CheckoutService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly subscriptionService = inject(SubscriptionService);

  userId = localStorage.getItem("userId");
  totalPrice = 0;
  checkOutItems: Order = {
    orderDetails: [],
  };
  showLoader = false;
  private destroyed$ = new ReplaySubject<void>(1);

  checkOutForm = this.fb.group({
    name: ["", Validators.required],
    addressLine1: ["", Validators.required],
    addressLine2: ["", Validators.required],
    pincode: [
      "",
      Validators.compose([
        Validators.required,
        Validators.pattern("^[1-9][0-9]{5}$"),
      ]),
    ],
    state: ["", [Validators.required]],
  });

  get checkoutFormControl() {
    return this.checkOutForm.controls;
  }

  ngOnInit() {
    this.getCheckOutItems();
  }

  getCheckOutItems() {
    this.showLoader = true;
    this.cartService
      .getCartItems(Number(this.userId))
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          const checkedOutItemCount = result.length;
          if (checkedOutItemCount > 0) {
            this.checkOutItems.orderDetails = result;
            this.getTotalPrice();
          } else {
            this.checkOutForm.disable();
          }
          this.showLoader = false;
        },
        error: (error) => {
          console.log(
            "Error ocurred while fetching shopping cart item : ",
            error
          );
          this.showLoader = false;
        },
      });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.checkOutItems.orderDetails.map((item) => {
      this.totalPrice += item.book.price * item.quantity;
    });
    this.checkOutItems.cartTotal = this.totalPrice;
  }

  placeOrder() {
    if (this.checkOutForm.valid) {
      this.checkOutService
        .placeOrder(Number(this.userId), this.checkOutItems)
        .pipe(takeUntil(this.destroyed$))
        .subscribe({
          next: (result) => {
            // this.subscriptionService.cartItemcount$.next(result);
            this.router.navigate(["/myorders"]);
            this.snackBarService.showSnackBar("Order placed successfully!!!");
          },
          error: (error) => {
            console.log("Error ocurred while placing order : ", error);
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
