import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  CATEGORIES_FEATURE_KEY,
  CategoryState,
} from "../reducers/categories.reducers";

const selectCategoryFeatureState = createFeatureSelector<CategoryState>(
  CATEGORIES_FEATURE_KEY
);

export const selectCategories = createSelector(
  selectCategoryFeatureState,
  (state) => state.categories
);
