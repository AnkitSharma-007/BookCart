import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ORDER_FEATURE_KEY, OrderState } from "../reducers/order.reducers";

const selectOrderFeatureState =
  createFeatureSelector<OrderState>(ORDER_FEATURE_KEY);

export const selectOrderItems = createSelector(
  selectOrderFeatureState,
  (state: OrderState) => state.orders
);

export const selectOrderCallState = createSelector(
  selectOrderFeatureState,
  (state) => state.orderCallState
);
