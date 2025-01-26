import { AsyncPipe, CurrencyPipe } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from "@angular/core";
import { MatButton, MatIconButton } from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardTitle,
} from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
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
import { LoadingState } from "src/app/shared/call-state";
import {
  addToCart,
  clearCart,
  loadCart,
  reduceCartQuantity,
  removeCartItem,
} from "src/app/state/actions/cart.actions";
import {
  selectCartCallState,
  selectCartItems,
} from "src/app/state/selectors/cart.selectors";

@Component({
    selector: "app-shoppingcart",
    templateUrl: "./shoppingcart.component.html",
    styleUrls: ["./shoppingcart.component.scss"],
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
        MatIconButton,
        MatIcon,
        MatHeaderRowDef,
        MatHeaderRow,
        MatRowDef,
        MatRow,
        CurrencyPipe,
        AsyncPipe,
    ]
})
export class ShoppingcartComponent implements OnInit {
  private readonly store = inject(Store);
  protected readonly loadingState = LoadingState;

  protected readonly cartItems$ = combineLatest([
    this.store.select(selectCartItems),
    this.store.select(selectCartCallState),
  ]).pipe(
    map(([items, callState]) => {
      const total = items.reduce(
        (total, item) => total + item.book.price * item.quantity,
        0
      );
      return { items, total, callState };
    })
  );

  displayedColumns: string[] = [
    "image",
    "title",
    "price",
    "quantity",
    "total",
    "action",
  ];

  ngOnInit() {
    this.store.dispatch(loadCart());
  }

  deleteCartItem(bookId: number) {
    this.store.dispatch(removeCartItem({ bookId }));
  }

  addBookToCart(bookId: number) {
    this.store.dispatch(addToCart({ bookId }));
  }

  deleteOneCartItem(bookId: number) {
    this.store.dispatch(reduceCartQuantity({ bookId }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }
}
