import { NgClass } from "@angular/common";
import { Component, inject, Input, OnChanges, OnDestroy } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { ReplaySubject, takeUntil } from "rxjs";
import { Book } from "src/app/models/book";
import { SnackbarService } from "src/app/services/snackbar.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { WishlistService } from "src/app/services/wishlist.service";

@Component({
  selector: "app-addtowishlist",
  templateUrl: "./addtowishlist.component.html",
  styleUrls: ["./addtowishlist.component.scss"],
  standalone: true,
  imports: [MatButton, NgClass],
})
export class AddtowishlistComponent implements OnChanges, OnDestroy {
  @Input()
  bookId: number;

  @Input()
  showButton = false;

  private readonly wishlistService = inject(WishlistService);
  private readonly subscriptionService = inject(SubscriptionService);
  private readonly snackBarService = inject(SnackbarService);

  userId = localStorage.getItem("userId");
  toggle: boolean;
  buttonText: string;
  private destroyed$ = new ReplaySubject<void>(1);

  ngOnChanges() {
    this.subscriptionService.wishlistItem$
      .pipe(takeUntil(this.destroyed$))
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
      .toggleWishlistItem(Number(this.userId), this.bookId)
      .pipe(takeUntil(this.destroyed$))
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
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
