import { createReducer, on } from "@ngrx/store";
import { CustomerOrder } from "src/app/models/order";
import { CallState, LoadingState } from "src/app/shared/call-state";
import {
  loadOrders,
  loadOrdersFailure,
  loadOrdersSuccess,
} from "../actions/order.actions";

export const ORDER_FEATURE_KEY = "order";

export interface OrderState {
  orders: CustomerOrder[];
  orderCallState: CallState;
}

const initialState: OrderState = {
  orders: [],
  orderCallState: LoadingState.INIT,
};

export const orderReducer = createReducer(
  initialState,
  on(loadOrders, (state) => ({
    ...state,
    orderCallState: LoadingState.LOADING,
  })),
  on(loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    orderCallState: LoadingState.LOADED,
  })),
  on(loadOrdersFailure, (state, { errorMessage }) => ({
    ...state,
    orderCallState: { errorMessage },
  }))
);
