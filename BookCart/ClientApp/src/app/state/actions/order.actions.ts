import { createAction, props } from "@ngrx/store";
import { Order } from "src/app/models/order";

export const loadOrders = createAction("[Orders] Load Orders");

export const loadOrdersSuccess = createAction(
  "[Orders] Load Orders Success",
  props<{ orders: Order[] }>()
);

export const loadOrdersFailure = createAction(
  "[Orders] Load Orders Failure",
  props<{ errorMessage: string }>()
);
