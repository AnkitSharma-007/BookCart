import { Component, OnDestroy, OnInit } from "@angular/core";
import { Book } from "src/app/models/book";
import { SubscriptionService } from "src/app/services/subscription.service";
import { Observable, Subject } from "rxjs";
import { WishlistService } from "src/app/services/wishlist.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"],
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlistItems$: Observable<Book[]>;
  isLoading: boolean;
  userId;
  displayedColumns: string[] = ["image", "title", "price", "cart", "wishlist"];
  private unsubscribe$ = new Subject<void>();

  constructor(
    private subscriptionService: SubscriptionService,
    private wishlistService: WishlistService,
    private snackBarService: SnackbarService
  ) {
    this.userId = localStorage.getItem("userId");
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getWishlistItems();
  }

  getWishlistItems() {
    this.wishlistItems$ = this.subscriptionService.wishlistItem$;
    this.isLoading = false;
  }

  clearWishlist() {
    this.wishlistService
      .clearWishlist(this.userId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (result) => {
          this.subscriptionService.wishlistItemcount$.next(result);
          this.snackBarService.showSnackBar("Wishlist cleared!!!");
        },
        error: (error) => {
          console.log("Error ocurred while deleting wishlist item : ", error);
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
