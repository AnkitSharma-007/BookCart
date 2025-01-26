import { AsyncPipe, CurrencyPipe } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { MatButton } from "@angular/material/button";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardTitle,
} from "@angular/material/card";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";
import { combineLatest, map } from "rxjs";
import { selectIsAuthenticated } from "src/app/state/selectors/auth.selectors";
import { selectCurrentBookDetails } from "src/app/state/selectors/book.selectors";
import { AddtocartComponent } from "../addtocart/addtocart.component";
import { AddtowishlistComponent } from "../addtowishlist/addtowishlist.component";
import { BookSummaryComponent } from "../book-summary/book-summary.component";
import { SimilarbooksComponent } from "../similarbooks/similarbooks.component";

@Component({
    selector: "app-book-details",
    templateUrl: "./book-details.component.html",
    styleUrls: ["./book-details.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatCard,
        MatCardHeader,
        MatCardTitle,
        MatCardContent,
        MatCardImage,
        AddtocartComponent,
        AddtowishlistComponent,
        BookSummaryComponent,
        SimilarbooksComponent,
        MatButton,
        RouterLink,
        AsyncPipe,
        CurrencyPipe,
    ]
})
export class BookDetailsComponent {
  private readonly store = inject(Store);

  bookDetails$ = combineLatest([
    this.store.select(selectCurrentBookDetails),
    this.store.select(selectIsAuthenticated),
  ]).pipe(
    map(([book, isAuthenticated]) => {
      if (book === undefined) {
        return null;
      } else {
        return {
          book,
          isAuthenticated,
        };
      }
    })
  );
}
