import { Component, Input, OnChanges, OnDestroy } from "@angular/core";
import { WishlistService } from "src/app/services/wishlist.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { Book } from "src/app/models/book";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: "app-addtowishlist",
  templateUrl: "./addtowishlist.component.html",
  styleUrls: ["./addtowishlist.component.scss"],
})
export class AddtowishlistComponent implements OnChanges, OnDestroy {
  @Input()
  bookId: number;

  @Input()
  showButton = false;

  userId;
  toggle: boolean;
  buttonText: string;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private wishlistService: WishlistService,
    private subscriptionService: SubscriptionService,
    private snackBarService: SnackbarService
  ) {
    this.userId = localStorage.getItem("userId");
  }

  ngOnChanges() {
    this.subscriptionService.wishlistItem$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((bookData: Book[]) => {
        this.setFavourite(bookData);
        this.setButtonText();
      });
  }

  setFavourite(bookData: Book[]) {
    const favBook = bookData.find((f) => f.bookId === this.bookId);

    if (favBook) {
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }

  setButtonText() {
    if (this.toggle) {
      this.buttonText = "Remove from Wishlist";
    } else {
      this.buttonText = "Add to Wishlist";
    }
  }

  toggleValue() {
    this.toggle = !this.toggle;
    this.setButtonText();

    this.wishlistService
      .toggleWishlistItem(this.userId, this.bookId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: () => {
          if (this.toggle) {
            this.snackBarService.showSnackBar("Item added to your Wishlist");
          } else {
            this.snackBarService.showSnackBar(
              "Item removed from your Wishlist"
            );
          }
        },
        error: (error) => {
          console.log("Error ocurred while adding to wishlist : ", error);
        },
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
