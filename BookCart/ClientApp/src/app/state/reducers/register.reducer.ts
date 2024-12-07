import { createReducer, on } from "@ngrx/store";
import { CallState, LoadingState } from "src/app/shared/call-state";
import {
  register,
  registerFailure,
  registerSuccess,
} from "../actions/auth.actions";

export const REGISTER_FEATURE_KEY = "register";

export interface RegisterState {
  registerCallState: CallState;
}

const initialState: RegisterState = {
  registerCallState: LoadingState.INIT,
};

export const registerReducer = createReducer(
  initialState,
  on(register, (state) => ({
    ...state,
    registerCallState: LoadingState.LOADING,
  })),
  on(registerSuccess, (state) => ({
    ...state,
    registerCallState: LoadingState.LOADED,
  })),
  on(registerFailure, (state, { errorMessage }) => ({
    ...state,
    registerCallState: { errorMessage },
  }))
);
