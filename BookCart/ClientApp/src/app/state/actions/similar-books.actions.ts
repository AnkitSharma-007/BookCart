import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/models/book";

export const loadSimilarBooks = createAction(
  "[SimilarBooks] Load Similar Books"
);

export const loadSimilarBooksSuccess = createAction(
  "[SimilarBooks] Load Similar Books Success",
  props<{ books: Book[] }>()
);

export const loadSimilarBooksFailure = createAction(
  "[SimilarBooks] Load Similar Books Failure",
  props<{ errorMessage: string }>()
);
