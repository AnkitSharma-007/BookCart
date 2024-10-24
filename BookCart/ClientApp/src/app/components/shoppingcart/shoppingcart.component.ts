import { Component, OnInit, OnDestroy } from "@angular/core";
import { ShoppingCart } from "src/app/models/shoppingcart";
import { CartService } from "src/app/services/cart.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { SubscriptionService } from "src/app/services/subscription.service";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { MatButton, MatIconButton } from "@angular/material/button";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { CurrencyPipe } from "@angular/common";

@Component({
    selector: "app-shoppingcart",
    templateUrl: "./shoppingcart.component.html",
    styleUrls: ["./shoppingcart.component.scss"],
    standalone: true,
    imports: [
    MatProgressSpinner,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatButton,
    RouterLink,
    MatTable,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatCellDef,
    MatCell,
    MatTooltip,
    MatIconButton,
    MatIcon,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
    CurrencyPipe
],
})
export class ShoppingcartComponent implements OnInit, OnDestroy {
  public cartItems: ShoppingCart[];
  userId;
  totalPrice: number;
  private unsubscribe$ = new Subject<void>();
  isLoading: boolean;
  displayedColumns: string[] = [
    "image",
    "title",
    "price",
    "quantity",
    "total",
    "action",
  ];

  constructor(
    private cartService: CartService,
    private snackBarService: SnackbarService,
    private subscriptionService: SubscriptionService
  ) {
    this.userId = localStorage.getItem("userId");
  }

  ngOnInit() {
    this.cartItems = [];
    this.isLoading = true;
    this.getShoppingCartItems();
  }

  getShoppingCartItems() {
    this.cartService
      .getCartItems(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result: ShoppingCart[]) => {
          this.cartItems = result;
          this.getTotalPrice();
          this.isLoading = false;
        },
        error: (error) => {
          console.log(
            "Error ocurred while fetching shopping cart item : ",
            error
          );
        },
      });
  }

  getTotalPrice() {
    this.totalPrice = 0;
    this.cartItems.forEach((item) => {
      this.totalPrice += item.book.price * item.quantity;
    });
  }

  deleteCartItem(bookId: number) {
    this.cartService
      .removeCartItems(this.userId, bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.subscriptionService.cartItemcount$.next(result);
          this.getShoppingCartItems();
          this.snackBarService.showSnackBar("Product removed from cart");
        },
        error: (error) => {
          console.log("Error ocurred while deleting cart item : ", error);
        },
      });
  }

  addToCart(bookId: number) {
    this.cartService
      .addBookToCart(this.userId, bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.subscriptionService.cartItemcount$.next(result);
          this.getShoppingCartItems();
          this.snackBarService.showSnackBar("One item added to cart");
        },
        error: (error) => {
          console.log("Error ocurred while addToCart data : ", error);
        },
      });
  }

  deleteOneCartItem(bookId: number) {
    this.cartService
      .deleteOneCartItem(this.userId, bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar("One item removed from cart");
          this.getShoppingCartItems();
        },
        error: (error) => {
          console.log("Error ocurred while fetching book data : ", error);
        },
      });
  }

  clearCart() {
    this.cartService
      .clearCart(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.subscriptionService.cartItemcount$.next(result);
          this.snackBarService.showSnackBar("Cart cleared!!!");
          this.getShoppingCartItems();
        },
        error: (error) => {
          console.log("Error ocurred while deleting cart item : ", error);
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
