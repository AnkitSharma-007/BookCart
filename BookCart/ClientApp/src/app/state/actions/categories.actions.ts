import { createAction, props } from "@ngrx/store";
import { Categories } from "src/app/models/categories";

export const loadCategories = createAction("[Categories] Load Categories");
export const loadCategoriesSuccess = createAction(
  "[Categories] Load Categories Success",
  props<{ genres: Categories[] }>()
);
export const loadCategoriesFailure = createAction(
  "[Categories] Load Categories Failure",
  props<{ error: string }>()
);
