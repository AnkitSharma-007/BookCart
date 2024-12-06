import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/models/book";

export const loadBooks = createAction("[Book] Load Books");

export const loadBooksSuccess = createAction(
  "[Book] Load Books Success",
  props<{ books: Book[] }>()
);

export const loadBooksFailure = createAction(
  "[Book] Load Books Failure",
  props<{ errorMessage: string }>()
);

export const addBook = createAction(
  "[Book] Add Book",
  props<{ book: FormData }>()
);

export const addBookSuccess = createAction(
  "[Book] Add Book Success",
  props<{ book: Book }>()
);

export const addBookFailure = createAction(
  "[Book] Add Book Failure",
  props<{ errorMessage: string }>()
);

export const updateBook = createAction(
  "[Book] Update Book",
  props<{ book: FormData }>()
);

export const updateBookSuccess = createAction(
  "[Book] Update Book Success",
  props<{ book: Book }>()
);

export const updateBookFailure = createAction(
  "[Book] Update Book Failure",
  props<{ errorMessage: string }>()
);

export const deleteBook = createAction(
  "[Book] Delete Book",
  props<{ bookId: number }>()
);

export const deleteBookSuccess = createAction(
  "[Book] Delete Book Success",
  props<{ bookId: number }>()
);

export const deleteBookFailure = createAction(
  "[Book] Delete Book Failure",
  props<{ errorMessage: string }>()
);

export const cancelBookFormNavigation = createAction(
  "[Book] Cancel Book Form Navigation"
);

export const setSearchItemValue = createAction(
  "[Book] Set Search Item Value",
  props<{ searchItem: string }>()
);

export const resetSearchItemValue = createAction(
  "[Book] Reset Search Item Value"
);
