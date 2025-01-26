import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/models/user";
import { CallState, LoadingState } from "src/app/shared/call-state";
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
  resetLoginFormError,
  setAuthState,
} from "../actions/auth.actions";

export const AUTH_FEATURE_KEY = "appAuth";

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  authCallState: CallState;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authCallState: LoadingState.INIT,
};

export const authReducer = createReducer(
  initialState,
  on(login, () => ({
    ...initialState,
  })),
  on(loginSuccess, (state) => ({
    ...state,
    authCallState: LoadingState.LOADED,
    isAuthenticated: true,
  })),
  on(setAuthState, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
  })),
  on(loginFailure, (state, { errorMessage }) => ({
    ...state,
    isAuthenticated: false,
    authCallState: { errorMessage },
  })),
  on(logout, () => ({
    ...initialState,
  })),
  on(resetLoginFormError, (state) => ({
    ...state,
    authCallState: LoadingState.INIT,
  }))
);
