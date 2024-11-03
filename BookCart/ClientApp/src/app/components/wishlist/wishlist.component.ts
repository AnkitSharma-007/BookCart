import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { Component, inject, OnDestroy } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
} from "@angular/material/table";
import { MatTooltip } from "@angular/material/tooltip";
import { RouterLink } from "@angular/router";
import { ReplaySubject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { SnackbarService } from "src/app/services/snackbar.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { WishlistService } from "src/app/services/wishlist.service";
import { AddtocartComponent } from "../addtocart/addtocart.component";
import { AddtowishlistComponent } from "../addtowishlist/addtowishlist.component";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.scss"],
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
export class WishlistComponent implements OnDestroy {
  private subscriptionService = inject(SubscriptionService);
  private wishlistService = inject(WishlistService);
  private snackBarService = inject(SnackbarService);
  private destroyed$ = new ReplaySubject<void>(1);

  wishlistItems$ = this.subscriptionService.wishlistItem$;
  userId = localStorage.getItem("userId");
  displayedColumns: string[] = ["image", "title", "price", "cart", "wishlist"];

  clearWishlist() {
    this.wishlistService
      .clearWishlist(Number(this.userId))
      .pipe(takeUntil(this.destroyed$))
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
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
