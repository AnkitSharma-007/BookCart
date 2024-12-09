import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  BOOK_FEATURE_KEY,
  bookAdapter,
  BookState,
} from "../reducers/book.reducers";
import { selectRouterParam } from "./router.selectors";

const selectBookFeatureState =
  createFeatureSelector<BookState>(BOOK_FEATURE_KEY);

const { selectAll, selectEntities } = bookAdapter.getSelectors();

export const selectBooks = createSelector(selectBookFeatureState, selectAll);
const selectBookEntities = createSelector(
  selectBookFeatureState,
  selectEntities
);

export const selectCurrentBookId = selectRouterParam("id");

export const selectCurrentBookDetails = createSelector(
  selectBookEntities,
  selectCurrentBookId,
  (books, id) => {
    if (id == null || !books) return undefined;
    return books[id];
  }
);

export const selectBookCallState = createSelector(
  selectBookFeatureState,
  (state) => state.bookCallState
);

export const selectSearchItemValue = createSelector(
  selectBookFeatureState,
  (state) => state.searchItem ?? ""
);

export const selectBookById = (bookId: number) =>
  createSelector(selectBookEntities, (books) => {
    if (bookId == null || !books) return undefined;
    return books[bookId];
  });

export const selectMinBookPrice = createSelector(selectBooks, (books) => {
  if (!books) return undefined;
  return Math.min(...books.map((b) => b.price));
});

export const selectMaxBookPrice = createSelector(selectBooks, (books) => {
  if (!books) return undefined;
  return Math.max(...books.map((b) => b.price));
});
