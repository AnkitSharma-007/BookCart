import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user";
import { UserLogin } from "src/app/models/userLogin";
import { UserRegistration } from "src/app/models/userRegistration";

export const login = createAction(
  "[Auth] Login",
  props<{ loginCredentials: UserLogin }>()
);
export const loginSuccess = createAction("[Auth] Login Success");

export const setAuthState = createAction(
  "[Auth] Set State Post Login Success",
  props<{ user: User }>()
);

export const loginFailure = createAction(
  "[Auth] Login Failure",
  props<{ errorMessage: string }>()
);

export const resetLoginFormError = createAction("[Auth] Login Error Reset");

export const logout = createAction("[Auth] Logout");

export const register = createAction(
  "[Auth] Register",
  props<{ userdetails: UserRegistration }>()
);

export const registerSuccess = createAction("[Auth] Register Success");

export const registerFailure = createAction(
  "[Auth] Register Failure",
  props<{ errorMessage: string }>()
);
