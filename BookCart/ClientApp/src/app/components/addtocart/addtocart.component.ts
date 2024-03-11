import { Component, Input, OnDestroy } from "@angular/core";
import { Subject, takeUntil } from "rxjs";
import { CartService } from "src/app/services/cart.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { SubscriptionService } from "src/app/services/subscription.service";

@Component({
  selector: "app-addtocart",
  templateUrl: "./addtocart.component.html",
  styleUrls: ["./addtocart.component.scss"],
})
export class AddtocartComponent implements OnDestroy {
  @Input()
  bookId: number;

  userId;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService
  ) {
    this.userId = localStorage.getItem("userId");
  }

  addToCart() {
    this.cartService
      .addBookToCart(this.userId, this.bookId)
      .pipe(takeUntil(this.unsubscribe$))
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
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
