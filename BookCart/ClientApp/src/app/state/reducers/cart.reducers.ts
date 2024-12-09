import { createReducer, on } from "@ngrx/store";
import { ShoppingCart } from "src/app/models/shoppingcart";
import { CallState, LoadingState } from "src/app/shared/call-state";
import { logout } from "../actions/auth.actions";
import {
  addToCart,
  addToCartFailure,
  addToCartSuccess,
  clearCart,
  clearCartFailure,
  clearCartSuccess,
  loadCart,
  loadCartFailure,
  loadCartSuccess,
  reduceCartQuantity,
  reduceCartQuantityFailure,
  reduceCartQuantitySuccess,
  removeCartItem,
  removeCartItemFailure,
  removeCartItemSuccess,
} from "../actions/cart.actions";

export const CART_FEATURE_KEY = "cart";

export interface CartState {
  shoppingCart: ShoppingCart[];
  cartCallState: CallState;
}

const initialState: CartState = {
  shoppingCart: [],
  cartCallState: LoadingState.INIT,
};

export const cartReducer = createReducer(
  initialState,
  on(loadCart, (state) => ({
    ...state,
    cartCallState: LoadingState.LOADING,
  })),
  on(loadCartSuccess, (state, { shoppingCart }) => ({
    ...state,
    shoppingCart,
    cartCallState: LoadingState.LOADED,
  })),
  on(loadCartFailure, (state, { errorMessage }) => ({
    ...state,
    cartCallState: { errorMessage },
  })),
  on(addToCart, (state) => ({
    ...state,
    cartCallState: LoadingState.LOADING,
  })),
  on(addToCartSuccess, (state, { shoppingCart }) => ({
    ...state,
    shoppingCart,
    cartCallState: LoadingState.LOADED,
  })),
  on(addToCartFailure, (state, { errorMessage }) => ({
    ...state,
    cartCallState: { errorMessage },
  })),
  on(removeCartItem, (state) => ({
    ...state,
    cartCallState: LoadingState.LOADING,
  })),
  on(removeCartItemSuccess, (state, { shoppingCart }) => ({
    ...state,
    shoppingCart,
    cartCallState: LoadingState.LOADED,
  })),
  on(removeCartItemFailure, (state, { errorMessage }) => ({
    ...state,
    cartCallState: { errorMessage },
  })),
  on(reduceCartQuantity, (state) => ({
    ...state,
    cartCallState: LoadingState.LOADING,
  })),
  on(reduceCartQuantitySuccess, (state, { shoppingCart }) => ({
    ...state,
    shoppingCart,
    cartCallState: LoadingState.LOADED,
  })),
  on(reduceCartQuantityFailure, (state, { errorMessage }) => ({
    ...state,
    cartCallState: { errorMessage },
  })),
  on(clearCart, (state) => ({
    ...state,
    cartCallState: LoadingState.LOADING,
  })),
  on(clearCartSuccess, (state) => ({
    ...state,
    shoppingCart: [],
    cartCallState: LoadingState.LOADED,
  })),
  on(clearCartFailure, (state, { errorMessage }) => ({
    ...state,
    cartCallState: { errorMessage },
  })),
  on(logout, (state) => ({
    ...state,
    shoppingCart: [],
    cartCallState: LoadingState.INIT,
  }))
);
