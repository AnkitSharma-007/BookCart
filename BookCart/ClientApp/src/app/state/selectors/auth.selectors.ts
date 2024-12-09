import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AUTH_FEATURE_KEY, AuthState } from "../reducers/auth.reducers";
import { getCallStateError } from "src/app/shared/call-state";

const selectAuthFeatureState =
  createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const selectIsAuthenticated = createSelector(
  selectAuthFeatureState,
  (state: AuthState) => state.isAuthenticated
);

export const selectAuthenticatedUser = createSelector(
  selectAuthFeatureState,
  (state) => state.user
);

export const selectLoginError = createSelector(
  selectAuthFeatureState,
  (state) => getCallStateError(state.authCallState)
);

export const selectCurrentUserId = createSelector(
  selectAuthenticatedUser,
  (authenticatedUser) => {
    return authenticatedUser === null
      ? localStorage.getItem("userId")
      : authenticatedUser.userId;
  }
);
