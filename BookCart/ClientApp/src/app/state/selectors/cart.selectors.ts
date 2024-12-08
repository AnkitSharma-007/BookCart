import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CART_FEATURE_KEY, CartState } from "../reducers/cart.reducers";

const selectCartFeatureState =
  createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const selectCartItems = createSelector(
  selectCartFeatureState,
  (state: CartState) => state.shoppingCart
);

export const selectCarttemsCount = createSelector(
  selectCartFeatureState,
  (state: CartState) => state?.shoppingCart.length
);

export const selectCartCallState = createSelector(
  selectCartFeatureState,
  (state) => state.cartCallState
);
