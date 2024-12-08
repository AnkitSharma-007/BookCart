import { createReducer, on } from "@ngrx/store";
import { Book } from "src/app/models/book";
import { CallState, LoadingState } from "src/app/shared/call-state";
import { logout } from "../actions/auth.actions";
import {
  clearWishlist,
  clearWishlistFailure,
  clearWishlistSuccess,
  loadWishlist,
  loadWishlistFailure,
  loadWishlistSuccess,
  toggleWishlistItem,
  toggleWishlistItemFailure,
  toggleWishlistItemSuccess,
} from "../actions/wishlist.actions";

export const WISHLIST_FEATURE_KEY = "wishlist";

export interface WishlistState {
  wishlist: Book[];
  wishlistCallState: CallState;
}

const initialState: WishlistState = {
  wishlist: [],
  wishlistCallState: LoadingState.INIT,
};

export const wishlistReducer = createReducer(
  initialState,
  on(loadWishlist, (state) => ({
    ...state,
    wishlistCallState: LoadingState.LOADING,
  })),
  on(loadWishlistSuccess, (state, { wishlist }) => ({
    ...state,
    wishlist,
    wishlistCallState: LoadingState.LOADED,
  })),
  on(loadWishlistFailure, (state, { errorMessage }) => ({
    ...state,
    wishlistCallState: { errorMessage },
  })),
  on(toggleWishlistItem, (state) => ({
    ...state,
    wishlistCallState: LoadingState.LOADING,
  })),
  on(toggleWishlistItemSuccess, (state, { wishlist }) => ({
    ...state,
    wishlist,
    wishlistCallState: LoadingState.LOADED,
  })),
  on(toggleWishlistItemFailure, (state, { errorMessage }) => ({
    ...state,
    wishlistCallState: { errorMessage },
  })),
  on(clearWishlist, (state) => ({
    ...state,
    wishlistCallState: LoadingState.LOADING,
  })),
  on(clearWishlistSuccess, (state) => ({
    ...state,
    wishlist: [],
    wishlistCallState: LoadingState.LOADED,
  })),
  on(clearWishlistFailure, (state, { errorMessage }) => ({
    ...state,
    wishlistCallState: { errorMessage },
  })),
  on(logout, () => ({
    ...initialState,
  }))
);
