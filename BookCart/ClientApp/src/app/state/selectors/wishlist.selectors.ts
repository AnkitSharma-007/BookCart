import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  WISHLIST_FEATURE_KEY,
  WishlistState,
} from "../reducers/wishlist.reducers";

const selectGenresFeatureState =
  createFeatureSelector<WishlistState>(WISHLIST_FEATURE_KEY);

export const selectWishlistItems = createSelector(
  selectGenresFeatureState,
  (state: WishlistState) => state.wishlist
);

export const selectWishlistItemsCount = createSelector(
  selectGenresFeatureState,
  (state: WishlistState) => state?.wishlist.length
);
