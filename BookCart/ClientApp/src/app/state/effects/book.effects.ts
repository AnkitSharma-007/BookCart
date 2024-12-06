import { inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { act, Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, exhaustMap, map, of, tap } from "rxjs";
import { BookService } from "src/app/services/book.service";
import { SnackbarService } from "src/app/services/snackbar.service";
import * as BookActions from "../actions/book.actions";

@Injectable()
export class BookEffects {
  private readonly actions$ = inject(Actions);
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);
  private readonly snackbarService = inject(SnackbarService);

  loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        BookActions.loadBooks,
        BookActions.addBookSuccess,
        BookActions.updateBookSuccess,
        BookActions.deleteBookSuccess
      ),
      exhaustMap(() =>
        this.bookService.getAllBooks().pipe(
          map((books) => BookActions.loadBooksSuccess({ books })),
          catchError((error) =>
            of(BookActions.loadBooksFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  addBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.addBook),
      exhaustMap((action) =>
        this.bookService.addBook(action.book).pipe(
          map((book) => {
            return BookActions.addBookSuccess({ book });
          }),
          tap(() => {
            this.snackbarService.showSnackBar("Book added successfully");
            this.navigateToAdminPanel();
          }),
          catchError((error) =>
            of(BookActions.addBookFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  updateBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.updateBook),
      exhaustMap((action) =>
        this.bookService.updateBookDetails(action.book).pipe(
          map((book) => BookActions.updateBookSuccess({ book })),
          tap(() => {
            this.snackbarService.showSnackBar("Book updated successfully");
            this.navigateToAdminPanel();
          }),
          catchError((error) =>
            of(BookActions.updateBookFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  deleteBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookActions.deleteBook),
      concatMap((action) =>
        this.bookService.deleteBook(action.bookId).pipe(
          map(() => BookActions.deleteBookSuccess({ bookId: action.bookId })),
          tap(() => {
            this.snackbarService.showSnackBar("Book deleted successfully");
          }),
          catchError((error) =>
            of(BookActions.deleteBookFailure({ errorMessage: error }))
          )
        )
      )
    )
  );

  handleAddUpdatebookFailureMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookActions.addBookFailure, BookActions.updateBookFailure),
        tap(({ errorMessage }) => {
          this.snackbarService.showSnackBar(`Error occurred: Please try again`);
          console.error(
            "Error occurred while adding/updating book data : ",
            errorMessage
          );
        })
      ),
    { dispatch: false }
  );

  handleDeleteBookFailureMessage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookActions.deleteBookFailure),
        tap(({ errorMessage }) => {
          this.snackbarService.showSnackBar(`Error occurred: Please try again`);
          console.error(
            "Error occurred while deleting book data : ",
            errorMessage
          );
        })
      ),
    { dispatch: false }
  );

  handleCancel$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookActions.cancelBookFormNavigation),
        tap(() => this.navigateToAdminPanel())
      ),
    { dispatch: false }
  );

  private navigateToAdminPanel() {
    this.router.navigate(["/admin/books"]);
  }
}
