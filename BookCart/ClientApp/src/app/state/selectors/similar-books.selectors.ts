import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  SIMILAR_BOOKS_FEATURE_KEY,
  SimilarBooksState,
} from "../reducers/similar-books.reducers";

const selectSimilarBooksFeatureState = createFeatureSelector<SimilarBooksState>(
  SIMILAR_BOOKS_FEATURE_KEY
);

export const selectSimilarBooks = createSelector(
  selectSimilarBooksFeatureState,
  (state: SimilarBooksState) => state.similarBooks
);
