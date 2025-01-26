import { NgClass } from "@angular/common";
import { Component, inject, Input, OnChanges, OnDestroy } from "@angular/core";
import { MatButton } from "@angular/material/button";
import { Store } from "@ngrx/store";
import { ReplaySubject, takeUntil } from "rxjs";
import { Book } from "src/app/models/book";
import { toggleWishlistItem } from "src/app/state/actions/wishlist.actions";
import { selectWishlistItems } from "src/app/state/selectors/wishlist.selectors";

@Component({
    selector: "app-addtowishlist",
    templateUrl: "./addtowishlist.component.html",
    styleUrls: ["./addtowishlist.component.scss"],
    imports: [MatButton, NgClass]
})
export class AddtowishlistComponent implements OnChanges, OnDestroy {
  @Input()
  bookId: number;

  @Input()
  showButton = false;

  private readonly store = inject(Store);

  userId = localStorage.getItem("userId");
  toggle = false;
  buttonText = "";
  private destroyed$ = new ReplaySubject<void>(1);

  ngOnChanges() {
    this.store
      .select(selectWishlistItems)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((bookData: Book[]) => {
        this.setFavourite(bookData);
        this.setButtonText();
      });
  }

  private setFavourite(bookData: Book[]) {
    const favBook = bookData.find((f) => f.bookId === this.bookId);

    if (favBook) {
      this.toggle = true;
    } else {
      this.toggle = false;
    }
  }

  private setButtonText() {
    if (this.toggle) {
      this.buttonText = "Remove from Wishlist";
    } else {
      this.buttonText = "Add to Wishlist";
    }
  }

  toggleValue() {
    this.toggle = !this.toggle;
    this.setButtonText();

    this.store.dispatch(
      toggleWishlistItem({
        bookId: this.bookId,
        isAdd: this.toggle,
      })
    );
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
