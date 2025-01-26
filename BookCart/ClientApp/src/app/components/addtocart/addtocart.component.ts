import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from "@angular/core";
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { addToCart } from "src/app/state/actions/cart.actions";

@Component({
    selector: "app-addtocart",
    templateUrl: "./addtocart.component.html",
    styleUrls: ["./addtocart.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [MatButton, MatIcon]
})
export class AddtocartComponent {
  @Input()
  bookId: number;

  private readonly store = inject(Store);

  addBookToCart() {
    this.store.dispatch(addToCart({ bookId: this.bookId }));
  }
}
