import { createAction, props } from "@ngrx/store";

export const placeOrder = createAction(
  "[Checkout] Place Order",
  props<{ totalPrice: number }>()
);

export const placeOrderSuccess = createAction("[Checkout] Place Order Success");

export const placeOrderFailure = createAction(
  "[Checkout] Place Order Failure",
  props<{ errorMessage: string }>()
);
