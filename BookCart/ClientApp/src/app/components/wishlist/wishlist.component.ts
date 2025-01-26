import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
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
import { Store } from "@ngrx/store";
import { combineLatest, map } from "rxjs";
import {
  clearWishlist,
  loadWishlist,
} from "src/app/state/actions/wishlist.actions";
import {
  selectWishlistCallState,
  selectWishlistItems,
} from "src/app/state/selectors/wishlist.selectors";
import { AddtocartComponent } from "../addtocart/addtocart.component";
import { AddtowishlistComponent } from "../addtowishlist/addtowishlist.component";
import { LoadingState } from "src/app/shared/call-state";

@Component({
    selector: "app-wishlist",
    templateUrl: "./wishlist.component.html",
    styleUrls: ["./wishlist.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
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
    ]
})
export class WishlistComponent {
  private readonly store = inject(Store);
  loadingState = LoadingState;

  protected readonly wishlistItems$ = combineLatest([
    this.store.select(selectWishlistItems),
    this.store.select(selectWishlistCallState),
  ]).pipe(
    map(([items, callState]) => ({
      items,
      callState,
    }))
  );
  displayedColumns: string[] = ["image", "title", "price", "cart", "wishlist"];

  ngOnInit(): void {
    this.store.dispatch(loadWishlist());
  }

  clearWishlist() {
    this.store.dispatch(clearWishlist());
  }
}
