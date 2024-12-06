import { createReducer, on } from "@ngrx/store";
import { CallState, LoadingState } from "src/app/shared/call-state";
import { Book } from "src/app/models/book";
import {
  loadSimilarBooks,
  loadSimilarBooksFailure,
  loadSimilarBooksSuccess,
} from "../actions/similar-books.actions";

export const SIMILAR_BOOKS_FEATURE_KEY = "similarBooks";

export interface SimilarBooksState {
  similarBooks: Book[];
  callState: CallState;
}

export const initialState: SimilarBooksState = {
  similarBooks: [],
  callState: LoadingState.INIT,
};

export const similarBooksReducer = createReducer(
  initialState,
  on(loadSimilarBooks, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(loadSimilarBooksSuccess, (state, { books }) => ({
    ...state,
    similarBooks: books,
    callState: LoadingState.LOADED,
  })),
  on(loadSimilarBooksFailure, (state, { errorMessage }) => ({
    ...state,
    callState: { errorMessage },
  }))
);
