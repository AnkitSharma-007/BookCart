import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  WISHLIST_FEATURE_KEY,
  WishlistState,
} from "../reducers/wishlist.reducers";

const selectWishlistFeatureState =
  createFeatureSelector<WishlistState>(WISHLIST_FEATURE_KEY);

export const selectWishlistItems = createSelector(
  selectWishlistFeatureState,
  (state: WishlistState) => state.wishlist
);

export const selectWishlistItemsCount = createSelector(
  selectWishlistFeatureState,
  (state: WishlistState) => state?.wishlist.length
);

export const selectWishlistCallState = createSelector(
  selectWishlistFeatureState,
  (state) => state.wishlistCallState
);
