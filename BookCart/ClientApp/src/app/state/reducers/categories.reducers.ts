import { createReducer, on } from "@ngrx/store";
import { Categories } from "src/app/models/categories";
import { CallState, LoadingState } from "src/app/shared/call-state";
import * as CategoriesActions from "../actions/categories.actions";

export const CATEGORIES_FEATURE_KEY = "categories";

export interface CategoryState {
  categories: Categories[];
  callState: CallState;
}

export const initialState: CategoryState = {
  categories: [],
  callState: LoadingState.INIT,
};

export const categoryReducer = createReducer(
  initialState,

  on(CategoriesActions.loadCategories, (state) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),

  on(CategoriesActions.loadCategoriesSuccess, (state, { genres }) => ({
    ...state,
    categories: genres,
    callState: LoadingState.LOADED,
  })),

  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    callState: { errorMessage: error },
  }))
);
