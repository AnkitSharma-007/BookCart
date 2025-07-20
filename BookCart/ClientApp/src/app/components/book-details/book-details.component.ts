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
import {
  selectCurrentBookDetails,
  selectBookCallState,
} from "src/app/state/selectors/book.selectors";
import { LoadingState, getCallStateError } from "src/app/shared/call-state";
import { AddtocartComponent } from "../addtocart/addtocart.component";
import { AddtowishlistComponent } from "../addtowishlist/addtowishlist.component";
import { BookSummaryComponent } from "../book-summary/book-summary.component";
import { SimilarbooksComponent } from "../similarbooks/similarbooks.component";
import { loadBooks } from "src/app/state/actions/book.actions";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

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
    MatProgressSpinner,
    AddtocartComponent,
    AddtowishlistComponent,
    BookSummaryComponent,
    SimilarbooksComponent,
    MatButton,
    RouterLink,
    AsyncPipe,
    CurrencyPipe,
  ],
})
export class BookDetailsComponent {
  private readonly store = inject(Store);
  LoadingState = LoadingState;

  bookDetails$ = combineLatest([
    this.store.select(selectCurrentBookDetails),
    this.store.select(selectIsAuthenticated),
    this.store.select(selectBookCallState),
  ]).pipe(
    map(([book, isAuthenticated, callState]) => {
      return {
        book,
        isAuthenticated,
        callState,
        isLoading: callState === LoadingState.LOADING,
        hasError: getCallStateError(callState) !== null,
      };
    })
  );

  constructor() {
    this.store.dispatch(loadBooks());
  }
}
