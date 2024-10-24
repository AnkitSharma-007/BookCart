import { Component, OnDestroy, OnInit } from "@angular/core";
import { Book } from "src/app/models/book";
import { SubscriptionService } from "src/app/services/subscription.service";
import { Observable, Subject } from "rxjs";
import { WishlistService } from "src/app/services/wishlist.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import { takeUntil } from "rxjs/operators";
import { AddtowishlistComponent } from "../addtowishlist/addtowishlist.component";
import { AddtocartComponent } from "../addtocart/addtocart.component";
import { MatTooltip } from "@angular/material/tooltip";
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { NgIf, AsyncPipe, CurrencyPipe } from "@angular/common";

@Component({
    selector: "app-wishlist",
    templateUrl: "./wishlist.component.html",
    styleUrls: ["./wishlist.component.scss"],
    standalone: true,
    imports: [
        NgIf,
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
        AddtocartComponent,
        AddtowishlistComponent,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        AsyncPipe,
        CurrencyPipe,
    ],
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
