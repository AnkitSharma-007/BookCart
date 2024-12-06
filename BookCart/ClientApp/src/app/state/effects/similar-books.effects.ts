import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of, switchMap } from "rxjs";
import { BookService } from "src/app/services/book.service";
import {
  loadSimilarBooks,
  loadSimilarBooksFailure,
  loadSimilarBooksSuccess,
} from "../actions/similar-books.actions";
import { selectCurrentBookId } from "../selectors/book.selectors";

@Injectable()
export class SimilarBooksEffects {
  private readonly actions$ = inject(Actions);
  private readonly bookService = inject(BookService);
  private readonly store = inject(Store);

  loadSimilarBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSimilarBooks),
      exhaustMap(() =>
        this.store.select(selectCurrentBookId).pipe(
          switchMap((bookId) => {
            if (bookId) {
              return this.bookService.getSimilarBooks(Number(bookId)).pipe(
                map((books) => loadSimilarBooksSuccess({ books })),
                catchError((error) =>
                  of(loadSimilarBooksFailure({ errorMessage: error }))
                )
              );
            } else {
              return of(
                loadSimilarBooksFailure({ errorMessage: "No book id found" })
              );
            }
          })
        )
      )
    )
  );
}
