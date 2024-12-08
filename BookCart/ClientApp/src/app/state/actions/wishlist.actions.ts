import { createAction, props } from "@ngrx/store";
import { Book } from "src/app/models/book";

export const loadWishlist = createAction("[Wishlist] Get Wishlist");

export const loadWishlistSuccess = createAction(
  "[Wishlist] Get Wishlist Success",
  props<{ wishlist: Book[] }>()
);

export const loadWishlistFailure = createAction(
  "[Wishlist] Get Wishlist Failure",
  props<{ errorMessage: string }>()
);

export const toggleWishlistItem = createAction(
  "[Wishlist] Toggle Wishlist Item",
  props<{ bookId: number; isAdd: boolean }>()
);

export const toggleWishlistItemSuccess = createAction(
  "[Wishlist] Toggle Wishlist Item Success",
  props<{ wishlist: Book[] }>()
);

export const toggleWishlistItemFailure = createAction(
  "[Wishlist] Toggle Wishlist Item Failure",
  props<{ errorMessage: string }>()
);

export const clearWishlist = createAction("[Wishlist] Clear Wishlist");

export const clearWishlistSuccess = createAction(
  "[Wishlist] Clear Wishlist Success"
);

export const clearWishlistFailure = createAction(
  "[Wishlist] Clear Wishlist Failure",
  props<{ errorMessage: string }>()
);
