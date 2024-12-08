import { createAction, props } from "@ngrx/store";
import { ShoppingCart } from "src/app/models/shoppingcart";

export const loadCart = createAction("[Cart] Load Cart");

export const loadCartSuccess = createAction(
  "[Cart] Load Cart Success",
  props<{ shoppingCart: ShoppingCart[] }>()
);

export const loadCartFailure = createAction(
  "[Cart] Load Cart Failure",
  props<{ errorMessage: string }>()
);

export const addToCart = createAction(
  "[Cart] Add To Cart",
  props<{ bookId: number }>()
);

export const addToCartSuccess = createAction(
  "[Cart] Add To Cart Success",
  props<{ shoppingCart: ShoppingCart[] }>()
);

export const addToCartFailure = createAction(
  "[Cart] Add To Cart Failure",
  props<{ errorMessage: string }>()
);

export const removeCartItem = createAction(
  "[Cart] Remove Cart Item",
  props<{ bookId: number }>()
);

export const removeCartItemSuccess = createAction(
  "[Cart] Remove Cart Item Success",
  props<{ shoppingCart: ShoppingCart[] }>()
);

export const removeCartItemFailure = createAction(
  "[Cart] Remove Cart Item Failure",
  props<{ errorMessage: string }>()
);

export const reduceCartQuantity = createAction(
  "[Cart] Reduce Cart Item Quantity",
  props<{ bookId: number }>()
);

export const reduceCartQuantitySuccess = createAction(
  "[Cart] Reduce Cart Item Quantity Success",
  props<{ shoppingCart: ShoppingCart[] }>()
);

export const reduceCartQuantityFailure = createAction(
  "[Cart] Reduce Cart Item Quantity Failure",
  props<{ errorMessage: string }>()
);

export const clearCart = createAction("[Cart] Clear Cart");

export const clearCartSuccess = createAction("[Cart] Clear Cart Success");

export const clearCartFailure = createAction(
  "[Cart] Clear Cart Failure",
  props<{ errorMessage: string }>()
);
