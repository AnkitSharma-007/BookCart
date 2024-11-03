import { Component, inject, Input, OnDestroy } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { ReplaySubject, takeUntil } from "rxjs";
import { CartService } from "src/app/services/cart.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { SubscriptionService } from "src/app/services/subscription.service";

@Component({
  selector: "app-addtocart",
  templateUrl: "./addtocart.component.html",
  styleUrls: ["./addtocart.component.scss"],
  standalone: true,
  imports: [MatButton, MatIcon],
})
export class AddtocartComponent implements OnDestroy {
  @Input()
  bookId: number;

  private readonly cartService = inject(CartService);
  private readonly snackBarService = inject(SnackbarService);
  private readonly subscriptionService = inject(SubscriptionService);

  userId = localStorage.getItem("userId");
  private destroyed$ = new ReplaySubject<void>(1);

  addToCart() {
    this.cartService
      .addBookToCart(Number(this.userId), this.bookId)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (result) => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar("One Item added to cart");
        },
        error: (error) => {
          console.log("Error ocurred while addToCart data : ", error);
        },
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
