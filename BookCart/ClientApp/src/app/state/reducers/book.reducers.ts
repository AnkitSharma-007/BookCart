import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Book } from "src/app/models/book";
import { CallState, LoadingState } from "src/app/shared/call-state";
import * as BookActions from "../actions/book.actions";

export const BOOK_FEATURE_KEY = "book";

export interface BookState extends EntityState<Book> {
  searchItem: string;
  bookCallState: CallState;
}

// The EntityAdapter is a utility that helps manage the state of an entity collection.
// The selectId function is used to select the unique identifier for an entity.
// We should always provide a selectId function when creating an EntityAdapter.
export const bookAdapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (book) => book.bookId,
});

const initialBookState: BookState = bookAdapter.getInitialState({
  searchItem: "",
  bookCallState: LoadingState.INIT,
});

export const bookReducer = createReducer(
  initialBookState,
  on(BookActions.loadBooks, (state) => ({
    ...state,
    bookCallState: LoadingState.LOADING,
  })),
  on(BookActions.loadBooksSuccess, (state, { books }) =>
    bookAdapter.setAll(books, { ...state, bookCallState: LoadingState.LOADED })
  ),
  on(BookActions.loadBooksFailure, (state, { errorMessage }) => ({
    ...state,
    bookCallState: { errorMessage },
  })),
  on(BookActions.addBook, (state) => ({
    ...state,
    bookCallState: LoadingState.LOADING,
  })),
  on(BookActions.addBookSuccess, (state, { book }) =>
    bookAdapter.addOne(book, {
      ...state,
      bookCallState: LoadingState.LOADED,
    })
  ),
  on(BookActions.addBookFailure, (state, { errorMessage }) => ({
    ...state,
    bookCallState: { errorMessage },
  })),
  on(BookActions.updateBook, (state) => ({
    ...state,
    bookCallState: LoadingState.LOADING,
  })),
  on(BookActions.updateBookSuccess, (state, { book }) =>
    bookAdapter.updateOne(
      { id: book.bookId, changes: book },
      {
        ...state,
        bookCallState: LoadingState.LOADED,
      }
    )
  ),
  on(BookActions.updateBookFailure, (state, { errorMessage }) => ({
    ...state,
    bookCallState: { errorMessage },
  })),
  on(BookActions.deleteBook, (state) => ({
    ...state,
    bookCallState: LoadingState.LOADING,
  })),
  on(BookActions.deleteBookSuccess, (state, { bookId }) =>
    bookAdapter.removeOne(bookId, {
      ...state,
      bookCallState: LoadingState.LOADED,
    })
  ),
  on(BookActions.deleteBookFailure, (state, { errorMessage }) => ({
    ...state,
    bookCallState: { errorMessage },
  })),
  on(BookActions.setSearchItemValue, (state, { searchItem }) => ({
    ...state,
    searchItem,
  })),
  on(BookActions.resetSearchItemValue, (state) => ({
    ...state,
    searchItem: "",
  }))
);
